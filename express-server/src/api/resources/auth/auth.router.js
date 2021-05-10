import express from 'express';
import authController from './auth.controller';
import { validateBody, schemas } from '../../../middleware/validator';
import { localStrategy, jwtStrategy } from '../../../middleware/strategy';

export const authRouter = express.Router();
authRouter.route('/login').post(validateBody(schemas.loginSchema), localStrategy, authController.login);
authRouter.route('/register').post(validateBody(schemas.registerSchema), authController.register);
authRouter.route('/token').get(jwtStrategy, authController.token);
