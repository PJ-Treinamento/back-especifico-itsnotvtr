import { Router } from 'express';

import UsersController from '../controller/UsersController';
import validateSchema from 'middlewares/validationResult';
import createSchema from 'schemas/customValidators/createSchema';
import updateSchema from 'schemas/customValidators/updateSchema';
import readIdSchema from 'schemas/customValidators/readIdSchema';
import deleteSchema from 'schemas/customValidators/deleteSchema';
import loginSchema from 'schemas/customValidators/loginSchema';


const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post('/create', createSchema, validateSchema,usersController.create);
usersRoutes.patch('/update/:id', updateSchema, validateSchema,usersController.update);
usersRoutes.get('/readAll', usersController.read);
usersRoutes.get('/read/:id', readIdSchema, validateSchema, usersController.readId);
usersRoutes.delete('/delete/:id', deleteSchema, validateSchema, usersController.delete);
usersRoutes.post('/login', loginSchema, validateSchema, usersController.login);

export default usersRoutes;
