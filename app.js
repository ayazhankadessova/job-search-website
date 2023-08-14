require('dotenv').config()
require('express-async-errors')

// security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiting = require('express-rate-limit')

const express = require('express')
const app = express()

// connect db
const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')

require('dotenv').config()

//routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())
// invoke security packages
app.use(helmet())
app.use(cors())
app.use(xss())

// Enable if you are behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx)
app.set('trust proxy', 1)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  // standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  // legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
})

app.use(apiLimiter)

// other packages

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

// app.use('/', async (req, res) => {
//   res.send('login user')
// })

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
