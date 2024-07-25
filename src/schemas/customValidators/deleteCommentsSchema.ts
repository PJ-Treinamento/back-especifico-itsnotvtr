import { param } from 'express-validator';

const deleteCommentsSchema = [param('idcomment').isUUID().withMessage('The id format is invalid')];

export default deleteCommentsSchema;