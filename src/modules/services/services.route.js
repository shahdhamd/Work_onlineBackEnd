import {Router} from 'express';
const routerser=Router();
import * as servicesRoute from './controller/services.controller.js'
import { fileValidation, myMulter } from '../../services/multer.js';
import { auth } from '../../midlleware/auth.js';
import { endpoint } from './services.endpoint.js';

routerser.post('/add',auth(endpoint.createServices),myMulter(fileValidation.imag).single('image'),servicesRoute.addServices)
routerser.delete('/delet/:id',auth(endpoint.delete),servicesRoute.deletServeces);
routerser.get('/find',servicesRoute.showAll)
routerser.patch('/:id',auth(endpoint.update),myMulter(fileValidation.imag).single('image'),servicesRoute.update)
routerser.post('/addModelToServices/:modeId',auth(endpoint.addmodelToServeces),servicesRoute.addmodelToServeces)
routerser.delete('/deletModel/:modeId/:modelID',servicesRoute.DeletModelfromServices)
routerser.get('/allModel/:id',servicesRoute.showAllModel)
routerser.patch('/updateModel/:modeId/:modelID',auth(endpoint.updateModel),servicesRoute.updateModel)
export default routerser;