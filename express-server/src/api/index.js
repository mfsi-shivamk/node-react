import express from 'express';
import { authRouter } from './resources/auth';
import { gitRouter } from './resources/git';

export const restRouter = express.Router();

restRouter.use('/v1/nlp', gitRouter);
restRouter.use('/v1/auth', authRouter);