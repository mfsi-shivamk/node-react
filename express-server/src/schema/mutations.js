/* eslint-disable arrow-parens */
const graphql = require('graphql');

const {
  GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLID
} = graphql;
const UserType = require('./types/user_type');
const MovieType = require('./types/movie_type');
const EyeTestType = require('./types/eye_test_type');
const { db } = require('../models');
const MovieRatingType = require('./types/movie_rating_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    movie: {
      type: MovieType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        actorInfo: { type: GraphQLString }
      },
      resolve(_parentValue, { name, description, actorInfo }) {
        return db.movie.create({
          name,
          description,
          actorInfo,
          totalAvgRating: 0,
          totalRatingCount: 0
        })
          .then(movie => {
            // eslint-disable-next-line no-undef
            pubSub.publish('movieAdded', movie);
            return movie;
          })
          .catch(() => new Error('SERVER_ERROR'));
      }
    },
    eyeTest: {
      type: EyeTestType,
      args: {
        name: { type: GraphQLString },
        score1: { type: GraphQLFloat },
        score2: { type: GraphQLFloat },
        score3: { type: GraphQLFloat }
      },
      resolve(_parentValue, {
        name, score1, score2, score3
      }, req) {
        return db.eyeTest.create({
          name,
          score1,
          score2,
          score3,
          userId: req.user.id
        })
          .then(eyeTest => eyeTest)
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
  }
});

module.exports = mutation;
