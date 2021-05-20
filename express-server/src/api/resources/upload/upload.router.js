import express from 'express';
import uploadController from './upload.controller';
import { validateBody, schemas } from '../../../middleware/validator';
import { localStrategy, jwtStrategy } from '../../../middleware/strategy';

export const uploadRouter = express.Router();
// upload.route('/login').post(validateBody(schemas.loginSchema), localStrategy, uploadController.login);
// upload.route('/register').post(validateBody(schemas.registerSchema), uploadController.register);
// upload.route('/token').get(jwtStrategy, uploadController.token);
uploadRouter.route('/:movieId').post(jwtStrategy, uploadController.onUpload);
uploadRouter.route('/movieId/:uuid').delete(jwtStrategy, uploadController.onDeleteFile);
