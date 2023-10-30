import type { Request, Response } from 'express'
import { Router } from 'express'
import errors from '../../../errors'
import s3 from '../../../utils/S3'
import { GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'
import type { ListObjectsV2CommandInput } from '@aws-sdk/client-s3'
import { param, query } from 'express-validator'
import validateParams from '../../../utils/validators/requestValidators'
import { encryptAndEncodeUrlSafe, decodeUrlSafeAndDecrypt } from '../../../utils/encryption'

const defaultPer = 15
const router = Router()

function encrypt (string: string): string {
  return encryptAndEncodeUrlSafe(string, process.env.KEY_SECRET ?? '')
}
function decrypt (string: string): string {
  return decodeUrlSafeAndDecrypt(string, process.env.KEY_SECRET ?? '')
}

router.get('/', [
  query('per').optional().isNumeric(),
  query('nextPage').optional().isString(),
  validateParams
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
], async (req: Request, res: Response) => {
  try {
    const {
      per,
      nextPage
    } = req.query
    const params: ListObjectsV2CommandInput = {
      Delimiter: '/',
      Bucket: process.env.AWS_S3_BUCKET ?? '',
      MaxKeys: defaultPer
    }
    if (per !== undefined) params.MaxKeys = Number(per)
    if (nextPage !== undefined) params.ContinuationToken = decrypt(req.query.nextPage as string)

    const command = new ListObjectsV2Command(params)
    const data = await s3.send(command)

    const albums = data.CommonPrefixes?.map((e) => ({
      type: 'album',
      name: e.Prefix ?? null,
      _links: {
        self: `/v1/public/albums/${e.Prefix?.replace('/', '')}`,
        images: `/v1/public/albums/${e.Prefix?.replace('/', '')}/images`
      }
    })) ?? []
    res.status(200).json({
      method: 'GET',
      status: 'OK',
      link: '/v1/public/albums',
      pagination: {
        per: data.MaxKeys,
        nextPage: data.NextContinuationToken === undefined ? null : encrypt(data.NextContinuationToken)
      },
      data: {
        document: 'album',
        albums
      }
    })
  } catch (err: any) {
    console.error(err.message)
    console.error(err.stack)
    res.status(500).json(errors[400]({ title: 'Something went wrong' }))
  }
})

router.get('/:album', [
  param('album').notEmpty().isString(),
  validateParams
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
], async (req: Request, res: Response) => {
  try {
    const album: string = req.params.album
    const Key = `${album}/`
    const params = {
      Delimiter: '/',
      Bucket: process.env.AWS_S3_BUCKET ?? '',
      Key
    }

    const command = new ListObjectsV2Command(params)
    const data = await s3.send(command)

    const albums = data.CommonPrefixes?.map((e) => ({
      type: 'album',
      name: e.Prefix ?? null,
      _link: {
        self: `/v1/public/albums/${e.Prefix?.replace('/', '')}`,
        images: `/v1/public/albums/${e.Prefix?.replace('/', '')}/images`
      }
    })) ?? []
    res.status(200).json({
      method: 'GET',
      status: 'OK',
      link: `/v1/public/albums/${req.params.album}`,
      data: {
        document: 'album',
        albums
      }
    })
  } catch (err: any) {
    console.error(err.message)
    console.error(err.stack)
    res.status(500).json(errors[400]({ title: 'Something went wrong' }))
  }
})

router.get('/:album/images', [
  param('album').notEmpty().isString(),
  query('per').optional().isNumeric(),
  query('nextPage').optional().isString(),
  validateParams
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
], async (req: Request, res: Response) => {
  try {
    const {
      per,
      nextPage
    } = req.query
    const Prefix = `${req.params.album}/mocks/`
    const params: ListObjectsV2CommandInput = {
      Delimiter: '/',
      Bucket: process.env.AWS_S3_BUCKET ?? '',
      MaxKeys: defaultPer,
      Prefix
    }
    if (per !== undefined) params.MaxKeys = Number(per)
    if (nextPage !== undefined) params.ContinuationToken = decrypt(req.query.nextPage as string)

    const command = new ListObjectsV2Command(params)
    const data = await s3.send(command)
    res.status(200).json({
      method: 'GET',
      status: 'OK',
      link: `/v1/public/albums/${req.params.album}/images`,
      pagination: {
        per: data.MaxKeys,
        nextPage: data.NextContinuationToken === undefined ? null : encrypt(data.NextContinuationToken)
      },
      data: {
        document: 'image',
        images: data.Contents?.map((e) => ({
          type: 'image',
          name: e.Key?.replace(Prefix, '') ?? null,
          updatedAt: e.LastModified?.toISOString() ?? null,
          etag: e.ETag?.replace(/"/g, '') ?? null,
          size: e.Size ?? null,
          _links: {
            self: `/v1/public/albums/${req.params.album}/images/${e.Key?.replace(Prefix, '')}`,
            album: `/v1/public/albums/${req.params.album}`
          }
        })) ?? []
      }
    })
  } catch (err: any) {
    console.error(err.message)
    console.error(err.stack)
    res.status(500).json(errors[500])
  }
})

router.get('/:album/images/:image', [
  param('album').notEmpty().isString(),
  param('image').notEmpty().isString(),
  validateParams
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
], async (req: Request, res: Response) => {
  try {
    const album: string = req.params.album
    const image: string = req.params.image
    const Key = `${album}/mocks/${image}`
    const params = {
      Bucket: process.env.AWS_S3_BUCKET ?? '',
      Key
    }
    const command = new GetObjectCommand(params)
    const data = await s3.send(command)
    res.setHeader('Content-Type', data.ContentType ?? 'image/jpeg')
    data.Body?.pipe(res)
  } catch (err: any) {
    console.error(err.message)
    console.error(err.stack)
    res.status(500).json(errors[500])
  }
})

export default router
