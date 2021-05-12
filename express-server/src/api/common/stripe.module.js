import _stripe from 'stripe';
import { db } from '../../models';
import config from '../../config';

const stripe = new _stripe(config.stripe.secret);

class Stripe {

  async createCustomer(user) {
    try {
      const { id } = await stripe.customers.create({
        email: user.email,
        name: `${user.firstName || ''} ${user.lastName || ''}`,
        phone: user.phone
      });
      return user.update({
        stripeId: id
      })
    } catch (err) {
      console.log(err);
    }
  }

  async createProduct(movie) {
    try {
      const { id } = await stripe.products.create({
        name: movie.name,
        description: movie.description
      });
      const price = await stripe.prices.create({
        unit_amount: Number(movie.price)*100,
        currency: movie.currency,
        product: id,
      });
      return movie.update({
        productId: id,
        priceId: price.id
      })
    } catch (err) {
      console.log(err);
    }
  }

  async createSession(movie, user) {
    try {
      const { id } = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        client_reference_id: user.stripeId,
        customer: user.stripeId,
        line_items: [
          {price: movie.priceId, quantity: 1},
        ],
        mode: 'payment',
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
      })
      return id;
    }
    catch(err) {
      console.log(err);
      return null;
    }
  }

}

module.exports = new Stripe();
