import { model, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import { User } from '../interfaces/user'

const UserSchema: Schema = new Schema(
  {
    first_name: {
      type: String,
      required: [true, 'Please provide a first name'],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, 'Please provide a last name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Minimum password length is 6 characters'],
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(this.password, salt)
  this.password = passwordHash
  next()
})

UserSchema.methods.isValidPassword = async function (password: string) {
  const user = this
  const compare = await bcrypt.compare(password, user.password)
  return compare
}

export default model<User>('User', UserSchema)
