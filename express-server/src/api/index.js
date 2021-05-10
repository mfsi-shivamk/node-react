import express from 'express';
import { authRouter } from './resources/auth';

export const restRouter = express.Router();

restRouter.use('/v1/auth', authRouter);
