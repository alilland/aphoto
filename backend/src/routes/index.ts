import express from 'express'
import publicRoutes from './public'
import errors from '../errors'

// variables
const router = express.Router()

const blocker1 = ['/.*', '/_*']
blocker1.forEach(link => {
  const response = errors[404]({
    title: 'Not Found',
    detail: null
  })
  router.get(link, (req, res) => {
    res.status(404).json(response)
  })
  router.post(link, (req, res) => {
    res.status(404).json(response)
  })
  router.patch(link, (req, res) => {
    res.status(404).json(response)
  })
  router.put(link, (req, res) => {
    res.status(404).json(response)
  })
})

const blocker2 = ['/']
blocker2.forEach(link => {
  const response = errors[404]({
    title: 'Not Found',
    detail: null
  })
  router.post(link, (req, res) => {
    res.status(404).json(response)
  })
  router.patch(link, (req, res) => {
    res.status(404).json(response)
  })
  router.put(link, (req, res) => {
    res.status(404).json(response)
  })
})

router.use('/', publicRoutes)

export default router
