import { Request, Response } from 'express'
import crypto from 'crypto'
import User from '../models/User'
import { userExists } from '../data-access/auth'

const register = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password, confirm_password } =
      req.body
    if (!first_name || !last_name || !email || !password || !confirm_password) {
      throw new Error('Please fill all fields')
    }
    const user = await userExists(email)
    console.log(user)
    if (user) {
      throw new Error('User already exists')
    }
    if (password !== confirm_password) {
      throw new Error('Passwords do not match')
    }
    const newUser = new User({
      first_name,
      last_name,
      email,
      password,
    })
    await newUser.save()
    res.status(201).json({ message: 'User created successfully' })
  } catch (err: unknown) {
    console.log(err)
    throw new Error('Error registering user')
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await userExists(email)
    if (!user) {
      throw new Error('User does not exist')
    }
    // const isMatch = await User.isValidPassword(password)
    // if (!isMatch) {
    //   throw new Error('Invalid credentials')
    // }
    const token = crypto.randomBytes(64).toString('hex')
    res.status(200).json({ token })
  } catch (err: unknown) {
    console.log(err)
    throw new Error('Error logging in user')
  }
}

const profile = async (req: Request, res: Response) => {}

export { register, login, profile }
