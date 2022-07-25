import express from 'express'
import AdminController from './controller'
import adminAuth from 'lib/utils/adminAuth'

const router = express.Router()

router.post('/create', AdminController.createAdmin)

router.post('/login-step-one', AdminController.loginStepOne)

router.post('/login-step-two', AdminController.loginStepTwo)

router.post('/me', adminAuth, AdminController.me)

export default router
