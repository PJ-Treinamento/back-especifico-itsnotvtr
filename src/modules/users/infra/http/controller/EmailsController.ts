import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendEmailWelcomeService from '@modules/users/services/SendEmailWelcomeService';

class EmailsController {
    public async sendEmailWelcome(request: Request, response: Response): Promise<Response> {
      const { to, name } = request.body;
  
      const sendEmailWelcome = container.resolve(SendEmailWelcomeService);
  
      await sendEmailWelcome.execute({ to, name });
  
      return response.status(200).json({ message: 'Email de boas-vindas enviado com sucesso!' });
    }
  }


export default EmailsController;