import express from "express";

import UserController from './controller'

const router = express.Router();

router.post('/sign-up-one', UserController.signup_stepOne)

router.post('/sign-up-two', UserController.signup_stepTwo)

router.post('/login-one', UserController.login_stepOne)

router.post('/login-two', UserController.login_stepTwo)

router.post('/me', UserController.me)

router.post('/edit', UserController.userEdit)

// router.get('/', AdminController.home)

// router.post('/create', AdminController.createAdmin)

// router.post('/login-step-one', AdminController.loginStepOne)

// router.post('/login-step-two', AdminController.loginStepTwo)

export default router;