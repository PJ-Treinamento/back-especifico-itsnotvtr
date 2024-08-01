import { Router } from 'express';
import EmailsController from '../controller/EmailsController';



const emailsRoutes = Router();

const emailsController = new EmailsController();

emailsRoutes.post('/send-email-welcome', emailsController.sendEmailWelcome);

export default emailsRoutes; 