import express from 'express';
import { authRouter } from './resources/auth';
import { uploadRouter } from './resources/upload';
import { gitRouter } from './resources/git';

export const restRouter = express.Router();

restRouter.use('/git', gitRouter);
restRouter.use('/v1/auth', authRouter);
restRouter.use('/v1/uploads', uploadRouter);
