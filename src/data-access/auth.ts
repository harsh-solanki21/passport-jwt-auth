import User from '../models/User'

export const userExists = async (email: string) => {
  const user = await User.findOne({ email })
  return user
}

export const getUserById = async (id: string) => {
  const user = await User.findById(id)
  return user
}
