import express from 'express';
import paymentController from './payment.controller';

export const paymentRouter = express.Router();

paymentRouter.route('/webhook').post(paymentController.index);