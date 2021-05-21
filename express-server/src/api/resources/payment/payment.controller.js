import Stripe from 'stripe';
import config from '../../../config';
import { db } from '../../../models';

const stripe = new Stripe(config.stripe.secret);
export default {

    async index(req, res, next) {
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.rawBody, req.header('Stripe-Signature'), config.stripe.webhook);
        } catch (err) {
            return res.sendStatus(400);
        }
        const dataObject = event.data.object;
        switch (event.type) {
            case 'checkout.session.completed':
                db.Payment.findOne({
                    where: { sessionId: dataObject.id }
                })
                    .then(payment => {
                        return payment.update({
                            status: "CHECKOUT_SESSION_COMPLETED"
                        })
                    })
                    .catch(e => {
                        console.log(e);
                    })
                break;
            default:
        }
        res.sendStatus(200);
    },

};
