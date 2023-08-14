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
app.use(rateLimiting())

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
