import { body } from 'express-validator';
import isTexto from './isTexto';

const updatePiuSchema = [ 
    body('texto').custom(isTexto)
];

export default updatePiuSchema;