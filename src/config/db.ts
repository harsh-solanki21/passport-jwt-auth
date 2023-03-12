import mongoose, { ConnectOptions } from 'mongoose'

const connectMongo = async (MONGO_URI: string) => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    console.log('Connected to mongo successfully')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export default connectMongo
