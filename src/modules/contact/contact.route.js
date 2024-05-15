import { Router } from "express";
import * as commentRouter from './controller/contact.controller.js'
import { auth } from "../../midlleware/auth.js";
import { endpoint } from "./contact.endpoint.js";
const router=Router();
router.post('/add/:serviceId',auth(endpoint.add),commentRouter.addContactServices)
router.get('/all',auth(endpoint.show),commentRouter.showAllContacts)
router.delete('/delet/:id', auth(endpoint.delete),commentRouter.deletContacts)
export default router;