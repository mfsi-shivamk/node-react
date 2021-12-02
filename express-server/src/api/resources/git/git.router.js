import express from 'express';
import { jwtStrategy } from '../../../middleware/strategy';
import gitController from './git.controller';

export const gitRouter = express.Router();

gitRouter.route('/model').post(jwtStrategy, gitController.index);
gitRouter.route('/models').get(jwtStrategy, gitController.list);
gitRouter.route('/models').patch(jwtStrategy, gitController.edit);
gitRouter.route('/predict').post(jwtStrategy, gitController.predict);