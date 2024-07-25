import { param } from 'express-validator';

const deletePiuSchema = [param('idpiu').isUUID().withMessage('The id format is invalid')];

export default deletePiuSchema;