import { Router } from "express";
import * as bagRouter from './controller/bag.controller.js'
const router = Router();
import { endpoints } from './bag.endpoint.js';
import { auth } from './../../midlleware/auth.js';


router.post('/add/:modeId/:servicesId/:itemId/:id', auth(endpoints.add), bagRouter.addToBag) ///
router.delete('/delet/:itemId/:id', auth(endpoints.add), bagRouter.deletFrombag)  ///
router.get('/all/:madeby', auth(endpoints.add), bagRouter.showAll)////
// router.patch('/increase/:itemId/:id', auth(endpoints.add), bagRouter.increaseRequestTimes)
router.patch('/decrease/:itemId/:id', auth(endpoints.add), bagRouter.decreaseRequestTimes) ///
// router.get('/quatity/:itemId/:id', auth(endpoints.add), bagRouter.getQuatity)
router.get('/:id', bagRouter.getUserCart)  //// 
router.get('/total/:id', auth(endpoints.add), bagRouter.Total) ///
export default router;