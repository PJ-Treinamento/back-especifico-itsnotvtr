import { param } from 'express-validator';

const deleteSchema = [param('id').isUUID().withMessage('The id format is invalid')];

export default deleteSchema;