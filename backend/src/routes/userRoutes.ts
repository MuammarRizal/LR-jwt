import { Router } from 'express'
import asyncHandler from '../utils/asyncHandler'
import { UserControllerRegister, UserControllerGetAllUsers, UserControllerLogin } from '../controllers/UserController'
import verifyToken from '../middlewares/verifyToken'

const router = Router()

router.get('/', verifyToken, asyncHandler(UserControllerGetAllUsers))
router.post('/register', asyncHandler(UserControllerRegister))
router.post('/login', asyncHandler(UserControllerLogin))

export default router
