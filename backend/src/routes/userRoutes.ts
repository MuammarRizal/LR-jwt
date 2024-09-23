import { Router } from 'express'
import asyncHandler from '../utils/asyncHandler'
import { UserControllerAddUser, UserControllerGetAllUsers } from '../controllers/UserController'

const router = Router()

router.get('/', asyncHandler(UserControllerGetAllUsers))
router.post('/add', asyncHandler(UserControllerAddUser))

export default router
