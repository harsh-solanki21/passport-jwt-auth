import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import passport from 'passport'
import connectMongo from './config/db'
import authRoutes from './routes/authRoutes'

dotenv.config()
const app = express()
const port = process.env.PORT || 5000
app.use(express.json())
app.use(cors())
app.use(passport.initialize())

// routes
app.use('/api/v1', authRoutes)

const start = async () => {
  try {
    await connectMongo(process.env.MONGO_URI!)
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
