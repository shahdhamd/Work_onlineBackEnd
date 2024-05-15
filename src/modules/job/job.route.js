import { Router } from "express";
import * as jobRouter from './controller/job.controller.js'
import { auth } from "../../midlleware/auth.js";
import { endpoints } from "./job.endpoint.js";
const router=Router();
router.post('/add/:jobId',auth(endpoints.add),jobRouter.addJob)
router.delete('/delet/:id/:jobId',auth(endpoints.delet),jobRouter.deletJob)
router.all('/all/:id',auth(endpoints.showAll),jobRouter.showAll)
router.patch('/update/:id/:jobId',auth(endpoints.update),jobRouter.updateJob)
export default router;