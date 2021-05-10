import express from 'express';
import { v1Router } from './resources/v1';
import { v1MovieRouter } from './resources/v1Movie';
import { authRouter } from './resources/auth';
import { xmlRouter } from './resources/xml';
import { v1ProjectRouter } from './resources/v1project';

export const restRouter = express.Router();
restRouter.use('/v1', v1Router);
// restRouter.use('/v1/movie', v1MovieRouter);
restRouter.use('/v1/auth', authRouter);
// restRouter.use('/v1/xml', xmlRouter);
// restRouter.use('/v1/project', v1ProjectRouter);
