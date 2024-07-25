import { body } from 'express-validator';
import isCPF from 'schemas/customValidators/isCPF';
import isName from 'schemas/customValidators/isName';

const createSchema = [ 
    body('name').trim().notEmpty().withMessage('Name is required').custom(isName).withMessage('The name format is invalid'),
    body('email').isEmail().withMessage('The email format is invalid').normalizeEmail(),
    body('password').isString().notEmpty().withMessage('This field is required'),
    body('phone').isMobilePhone('pt-BR').withMessage('The phone format is invalid'),
    body('cpf').custom(isCPF),
    body('nascimento').isISO8601().withMessage('The date format is invalid')];

export default createSchema;