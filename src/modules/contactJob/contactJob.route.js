import { Router } from "express";
import * as commentRouterJob from './controller/contactJob.controller.js'
import { auth } from "../../midlleware/auth.js";
import { endpoint } from "./contactJob.endpoint.js";

const router=Router();
router.post('/add/:jobId',auth(endpoint.add),commentRouterJob.addJobContact)
router.get('/all',auth(endpoint.show),commentRouterJob.showAllContacts)
router.delete('/delet/:id', auth(endpoint.delete),commentRouterJob.deletContacts)
export default router;