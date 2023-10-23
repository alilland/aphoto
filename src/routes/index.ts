import express from 'express'
import { version } from '../../package.json'

// variables
const router = express.Router()

const blocker1 = ['/.*', '/_*']
blocker1.forEach(link => {
  const response = { error: '404 Not Found' }
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
  const response = { error: '404 Not Found' }
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

// -------------------------------------------------------------------------------------------------
// ** root api response for health checking **
// -------------------------------------------------------------------------------------------------
router.get('/', (req, res) => {
  try {
    if (Object.keys(req.query).length > 0) {
      console.log('potential phishing attempt, blocked')
      res.status(400).json({ error: 'Bad Request' })
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
    res.status(400).json({ error: 'Bad Request' })
  }
})

// unauthenticated
// router.use('/health', health)
// router.get('/health/forceError', authenticate, () => {
//   log.error('forceError route hit')
//   process.exit(1)
// })
// -------------------------------------------------------------------------------------------------
// ** authenticated routes, these are protected behind a email and password authorization token **
// -------------------------------------------------------------------------------------------------
// router.use('/changeOrders', authenticate, changeOrders)
// router.use('/pricings', authenticate, pricings)
// router.use('/titanJobs', authenticate, titanJobs)
// router.use('/titan', authenticate, titan)
// router.use('/downloads', authenticate, downloads)
// router.use('/webhooks', authenticate, webhooks)
// router.use('/secrets', authenticate, secrets)
// router.use('/receiveHooks', verifyHeader, receiveHooks)
// router.use('/pricingTemplates', authenticate, pricingTemplateAuth, pricingTemplates)
// router.use('/laborTemplates', authenticate, laborTemplateAuth, laborTemplates)
// router.use('/estimates', authenticate, estimates)
// router.use('/transferEstimateTemplate', authenticate, transferEstimateTemplate)
// router.use('/formulas', authenticate, formulaDetails)
// router.use('/v1/events', authenticate, events)

export default router
