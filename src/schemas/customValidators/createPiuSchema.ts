import { body } from 'express-validator';
import isTexto from './isTexto';

const createPiuSchema = [ 
    body('texto').custom(isTexto),
    body('userId').notEmpty().withMessage('userId cannot be empty').bail().isUUID().withMessage('The id format is invalid')
];

export default createPiuSchema;