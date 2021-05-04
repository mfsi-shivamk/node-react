const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID
} = graphql;
const UserType = require('./types/user_type');
const MovieType = require('./types/movie_type');
// const AuthService = require('../services/auth');
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
        actorInfo: {type: GraphQLString}
      },
      resolve(parentValue, { name, description, actorInfo }, req) {
        return db.movie.create({
          name,
          description,
          actorInfo,
          totalAvgRating: 0,
          totalRatingCount: 0
        })
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
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
      resolve(parentValue, { email, password }, req) {
        return null
      }
    },
    addRatingToMovie: {
      type: MovieRatingType,
      args: {
        movieId: { type: GraphQLID },
        rating: { type: GraphQLFloat }
      },
      resolve(parentValue, { movieId, rating }, req) {
        return db.movieRating.findOne({ where: {movieId, userId: req.user.id} })
        .then(function(movieRating) {
            if(movieRating) return movieRating.update({rating});
            return db.movieRating.create({rating, movieId, userId: req.user.id});
        })
      }
    },
  }
});

module.exports = mutation;
