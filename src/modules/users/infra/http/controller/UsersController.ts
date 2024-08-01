import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import ReadAllUserService from '@modules/users/services/ReadAllUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import ReadUserService from '@modules/users/services/ReadUserService';
import LoginUserService from '@modules/users/services/LoginUserService';
import SendEmailWelcomeService from '@modules/users/services/SendEmailWelcomeService';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      cpf,
      phone,
      password,
      nascimento,
    } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      cpf,
      phone,
      password,
      nascimento,
    });

    const sendEmailWelcome = container.resolve(SendEmailWelcomeService);
    await sendEmailWelcome.execute({
      to: email,
      name,
    });


    return res.status(200).json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      name,
      email,
      cpf,
      phone,
      password,
      nascimento,
    } = req.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      id,
      name,
      email,
      cpf,
      phone,
      password,
      nascimento,
    });

    const userWithoutPassword = { ...user, password: undefined };

    return res.status(200).json(userWithoutPassword);
  }

  public async read(req: Request, res: Response): Promise<Response> {
    const readAllUserService = container.resolve(ReadAllUserService);
    const users = await readAllUserService.execute();
    return res.json(users);
  }

  public async readId(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const readIdService = container.resolve(ReadUserService);
    const user = await readIdService.execute({ id });
    return res.json(user);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteUser = container.resolve(DeleteUserService);

    const deletedUser = await deleteUser.execute({ id });

    return res.status(200).json(deletedUser);
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const loginUserService = container.resolve(LoginUserService);

    const { user, token } = await loginUserService.execute({ email, password });

    return res.json({ user, token });
  }


}
