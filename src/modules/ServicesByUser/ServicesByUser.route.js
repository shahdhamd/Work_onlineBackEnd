import { Router } from "express";
import { fileValidation, myMulter } from "../../services/multer.js";
const router = Router();
import * as servicesbyuser from './controller/ServicesByUser.controller.js'
import { auth } from "../../midlleware/auth.js";
import { endpoint } from "./Servicesbyuser.endpoint.js";
router.post('/addbyuser/:servicesId', auth(endpoint.add), myMulter(fileValidation.imag).single('image'), servicesbyuser.addServicesbyuser)
router.delete('/delet/:id/:servicesId/:userId', auth(endpoint.delete), servicesbyuser.deletUserformservicing)
router.get('/all/:id', servicesbyuser.showAll)
router.get('/all', servicesbyuser.All)
router.get('/userinfo/:id',servicesbyuser.infor)
router.get('/AllModel',servicesbyuser.AllModel)
router.get('/allService',servicesbyuser.showServiceByUser)
router.patch('/update/:id/:servicesId/:userId', myMulter(fileValidation.imag).single('image'), auth(endpoint.update), servicesbyuser.updateServising)
export default router;  