import { Router } from 'express'
import { authenticate } from '../middlewares/passportMiddleware'
import { register, login, profile } from '../controller/authController'

const router: Router = Router()

router.post('/register', register)

router.post('/login', login)

router.post('/profile', authenticate, profile)

export default router
