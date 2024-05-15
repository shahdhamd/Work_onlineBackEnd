import { Router } from "express";
import * as auth from './controller/auth.controller.js'
import * as validateAuth from '../auth/auth.validation.js'
import { validation } from './../../midlleware/validation.js';
const router=Router()
router.post('/signup',validation(validateAuth.signup),auth.signup);
router.post('/signin',validation(validateAuth.signin),auth.signin)
router.get('/confirmEmail/:token',auth.confirmEmail)
router.patch('/sendcode',validation(validateAuth.sendCode),auth.sendCode)
router.patch('/forgetpassword',validation(validateAuth.forgetPassword),auth.forgetPassward)
router.get('/all',auth.showAll)
router.get('/now',auth.openNow)

router.get('/:id',auth.userInformation)

export default router
