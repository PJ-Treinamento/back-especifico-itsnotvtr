import { body } from 'express-validator';

const createLikeSchema = [ 
    body('userId').notEmpty().withMessage('userId cannot be empty').bail().isUUID().withMessage('The id format is invalid'),
    body('piuId').notEmpty().withMessage('piuId cannot be empty').bail().isUUID().withMessage('The id format is invalid')
];

export default createLikeSchema;