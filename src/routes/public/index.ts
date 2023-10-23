import express from 'express'
import { version } from '../../../package.json'
import errors from '../../errors'
import v1Routes from './v1'
const router = express.Router()

router.get('/', (req, res) => {
  try {
    if (Object.keys(req.query).length > 0) {
      console.log('potential phishing attempt, blocked')
      res.status(400).json(errors[400]({
        title: 'Bad Request',
        detail: null
      }))
      throw new Error('potential phishing attempt, blocked')
    } else {
      res.json({
        root: {
          api: process.env.API,
          version
        }
      })
    }
  } catch (err: any) {
    console.error(err.message)
    console.error(err.stack)
    res.status(400).json(errors[400]({
      title: 'Bad Request',
      detail: null
    }))
  }
})

router.use('/v1/public', v1Routes)

export default router
