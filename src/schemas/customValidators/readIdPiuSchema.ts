import { param } from 'express-validator';

const readIdPiuSchema = [param('idpiu').isUUID().withMessage('The id format is invalid')];

export default readIdPiuSchema;