import { body } from 'express-validator';

const loginSchema = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password cannot be empty'),
];

export default loginSchema;
