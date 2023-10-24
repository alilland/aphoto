import express from 'express'
import errors from '../../../errors'
import s3 from '../../../utils/S3'
import { GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'

const router = express.Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', async (_req, res) => {
  try {
    const defaultSearchOptions = {
      Delimiter: '/',
      Bucket: process.env.AWS_S3_BUCKET ?? '',
      MaxKeys: 15
    }
    const command = new ListObjectsV2Command(defaultSearchOptions)
    const data = await s3.send(command)

    const albums = data.CommonPrefixes?.map((e) => ({
      type: 'album',
      name: e.Prefix ?? null
    })) ?? []
    res.status(200).json(albums)
  } catch (err: any) {
    console.error(err.message)
    console.error(err.stack)
    res.status(500).json(errors[400]({ title: 'Something went wrong' }))
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:album', async (req, res) => {
  try {
    const Prefix = `${req.params.album}/mocks/`
    const defaultSearchOptions = {
      Delimiter: '/',
      Bucket: process.env.AWS_S3_BUCKET ?? '',
      MaxKeys: 15,
      Prefix
    }
    const command = new ListObjectsV2Command(defaultSearchOptions)
    const data = await s3.send(command)
    res.status(200).json(data.Contents?.map((e) => ({
      type: 'image',
      name: e.Key?.replace(Prefix, '') ?? null,
      updatedAt: e.LastModified?.toISOString() ?? null,
      etag: e.ETag?.replace(/"/g, '') ?? null,
      size: e.Size ?? null
    })) ?? [])
  } catch (err: any) {
    console.error(err.message)
    console.error(err.stack)
    res.status(500).json(errors[500])
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:album/:image', async (req, res) => {
  try {
    const album: string = req.params.album
    const image: string = req.params.image
    const Key = `${album}/mocks/${image}`
    const defaultSearchOptions = {
      Bucket: process.env.AWS_S3_BUCKET ?? '',
      Key
    }
    const command = new GetObjectCommand(defaultSearchOptions)
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
