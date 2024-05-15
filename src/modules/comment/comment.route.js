import { Router } from "express";
const router=Router();
import * as commentRouter from './controller/comment.controller.js'
import { endpoints } from './comment.endpoint.js';
import { auth } from './../../midlleware/auth.js';

router.post('/add/:id/:servicesId',auth(endpoints.add),commentRouter.addComment)
router.delete('/delet/:id/:servicesId/:commentId',auth(endpoints.delet),commentRouter.deletComment)
router.get('/all/:id/:servicesId',commentRouter.showComment)

export default router
