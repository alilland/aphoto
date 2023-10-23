import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import routeDirectory from './routes'

const app = express()
app.use(helmet())
// allow requests from all ip addresses
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// Enable trust proxy to get the real client ip address
// https://expressjs.com/en/guide/behind-proxies.html
app.enable('trust proxy')

/* == Log the request == */
app.use((req, res, next) => {
  /* == Log the req == */
  const userAgent = req.get('user-agent') ?? ''
  if (!userAgent.includes('ELB-HealthChecker')) {
    console.log(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${String(req.socket.remoteAddress)}]`)
  }

  res.on('finish', () => {
    /* == Log the res == */
    if (!userAgent.includes('ELB-HealthChecker')) {
      console.log(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${String(req.socket.remoteAddress)}]`)
    }
  })

  next()
})

/* == Route Directory == */
app.use('/', routeDirectory)

/* == Error Handling == */
app.use((_req, res) => {
  const error = new Error('Not Found')

  res.status(404).json({
    message: error.message
  })
})

const port = process.env.PORT ?? '3001'
const server = app.listen(port, () => {
  console.log('⚡️ Successfully Started Express Server')
  console.log(`⚡️ Environment: ${process.env.NODE_ENV ?? 'development'}`)
  console.log(`⚡️ Node Version: ${process.version}`)
  console.log(`⚡️ Listening on Port: ${port}`)
  console.log(`⚡️ OS ${process.platform}`)
})

export default server
