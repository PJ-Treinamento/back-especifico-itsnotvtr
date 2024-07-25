import { Router } from 'express';
import PiusController from '../controller/PiusController';
import validateSchema from 'middlewares/validationResult';
import createPiuSchema from 'schemas/customValidators/createPiuSchema';
import createLikeSchema from 'schemas/customValidators/createLikeSchema';
import createCommentsSchema from 'schemas/customValidators/createCommentsSchema';
import updatePiuSchema from 'schemas/customValidators/updatePiuSchema';
import readIdPiuSchema from 'schemas/customValidators/readIdPiuSchema';
import deletePiuSchema from 'schemas/customValidators/deletePiuSchema';
import deleteLikeSchema from 'schemas/customValidators/deleteLikeSchema';
import deleteCommentsSchema from 'schemas/customValidators/deleteCommentsSchema';



const piusRoutes = Router();

const piusController = new PiusController();

piusRoutes.post('/create', createPiuSchema, validateSchema,piusController.create);
piusRoutes.post('/create-like', createLikeSchema, validateSchema, piusController.createLike);
piusRoutes.post('/create-comment', createCommentsSchema, validateSchema, piusController.createComments);
piusRoutes.patch('/update/:idpiu', updatePiuSchema, validateSchema,piusController.update);
piusRoutes.get('/readAll', piusController.read);
piusRoutes.get('/read/:idpiu', readIdPiuSchema, validateSchema, piusController.readId);
piusRoutes.delete('/delete/:idpiu', deletePiuSchema, validateSchema, piusController.delete);
piusRoutes.delete('/delete-like/:idlike', deleteLikeSchema, validateSchema, piusController.deleteLike);
piusRoutes.delete('/delete-comment/:idcomment', deleteCommentsSchema, validateSchema, piusController.deleteComments);

export default piusRoutes;
