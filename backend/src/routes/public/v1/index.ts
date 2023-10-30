import express from 'express'
import albums from './albums'

const router = express.Router()

router.use('/albums', albums)

export default router
