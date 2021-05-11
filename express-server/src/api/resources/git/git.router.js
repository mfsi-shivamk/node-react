import express from 'express';
import gitController from './git.controller';

export const gitRouter = express.Router();

gitRouter.route('/webhook').post(gitController.index);