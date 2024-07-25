import { body } from 'express-validator';
import isTexto from './isTexto';

const createCommentsSchema = [ 
    body('userId').notEmpty().withMessage('userId cannot be empty').bail().isUUID().withMessage('The id format is invalid'),
    body('piuId').notEmpty().withMessage('piuId cannot be empty').bail().isUUID().withMessage('The id format is invalid'),
    body('texto').custom(isTexto)
];

export default createCommentsSchema;