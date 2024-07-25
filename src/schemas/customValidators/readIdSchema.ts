import { param } from 'express-validator';

const readIdSchema = [param('id').isUUID().withMessage('The id format is invalid')];

export default readIdSchema;