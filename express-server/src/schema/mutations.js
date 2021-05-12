import bcrypt from 'bcrypt-nodejs';
/* eslint-disable arrow-parens */
const graphql = require('graphql');

const {
  GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLID
} = graphql;
const UserType = require('./types/user_type');
const MovieType = require('./types/movie_type');
const SessionType = require('./types/session_type');
const { db } = require('../models');
const MovieRatingType = require('./types/movie_rating_type');
import { createProduct, createSession } from '../api/common/stripe.module';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    movie: {
      type: MovieType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLString },
        currency: { type: GraphQLString },
        actorInfo: { type: GraphQLString }
      },
      resolve(_parentValue, { name, description, actorInfo, price, currency }) {
        return db.movie.create({
          name,
          description,
          actorInfo,
          price,
          currency,
          totalAvgRating: 0,
          totalRatingCount: 0
        })
        .then(movie => {
          createProduct(movie);
          pubSub.publish('movieAdded', movie);
          return movie;
        })
        .catch(() => new Error('SERVER_ERROR'));
      }
    },
    logout: {
      type: UserType,
      resolve(_parentValue, _args, req) {
        const { user } = req;
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve() {
        throw new Error('INVALID_USER');
      }
    },
    addRatingToMovie: {
      type: MovieRatingType,
      args: {
        movieId: { type: GraphQLID },
        rating: { type: GraphQLFloat }
      },
      resolve(_parentValue, { movieId, rating }, req) {
        return db.movieRating.findOne({ where: { movieId, userId: req.user.id } })
          .then((movieRating) => {
            if (movieRating) return movieRating.update({ rating });
            return db.movieRating.create({ rating, movieId, userId: req.user.id });
          }).catch(() => new Error('SERVER_ERROR'));
      }
    },
    updateUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
      },
      resolve: async (_parentValue, args, req) => {
        
        const user = await db.User.findOne({ where: { id: { $not: req.user.id }, $or: [{ email: args.email }, { phone: args.phone }] } });
        if (user) throw new Error('USER_EXISTS');
        await db.User.update(args, { where: { id: req.user.id } });
        return db.User.findOne({ attributes: ['id', 'firstName', 'lastName', 'phone', 'email'], where: { id: req.user.id } });
      
      }
    },
    updateUserCredentials: {
      type: UserType,
      args: {
        currentPassword: { type: GraphQLString },
        newPassword: { type: GraphQLString }
      },
      resolve: async (_parentValue, args, req) => {
        const match = bcrypt.compareSync(args.currentPassword, req.user.key);
        if (!match) throw new Error('INVALID_CREDENTIALS');
        await db.User.update({ key: bcrypt.hashSync(args.newPassword)}, { where: { id: req.user.id } });
        return db.User.findOne({ attributes: ['id', 'firstName', 'lastName', 'phone', 'email'], where: { id: req.user.id } });
      }
    },

    checkout: {
      type: SessionType,
      args: {
        movieId: { type: graphql.GraphQLInt}
      },
      resolve:  async(_parentValue, args, req) => {
       const movie = await db.movie.findOne({
          where: { id: args.movieId }
        });
        if(!movie) throw new Error('INVALID_CREDENTIALS');
        const id = await createSession(movie, req.user);
        return { id };
      }
    }
  }
});

module.exports = mutation;
