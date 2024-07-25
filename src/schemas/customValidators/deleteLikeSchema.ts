import { param } from 'express-validator';

const deleteLikeSchema = [param('idlike').isUUID().withMessage('The id format is invalid')];

export default deleteLikeSchema;