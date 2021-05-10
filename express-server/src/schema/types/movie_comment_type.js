const graphql = require('graphql');
const { db } = require('../../models');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql;

const MovieCommentType = new GraphQLObjectType({
  name: 'MovieCommentType',
  fields: () => ({
    id: { type: GraphQLID },
    movieId: { type: GraphQLID },
    userId: { type: GraphQLID },
    text: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    movie: {
      // eslint-disable-next-line global-require
      type: require('./movie_type'),
      resolve(parentValue) {
        return db.Movie.findOne({
          where: { movieId: parentValue.movie }
        });
      }
    },
    user: {
      // eslint-disable-next-line global-require
      type: require('./user_type'),
      resolve(parentValue, args, req) {
        return db.User.findOne({
          where: { id: req.user.id }
        });
      }
    }
  })
});

module.exports = MovieCommentType;
