const graphql = require('graphql');
const { db } = require('../../models');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
  GraphQLList
} = graphql;

const MovieType = new GraphQLObjectType({
  name: 'MovieType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    count: { type: GraphQLFloat },
    actorInfo: { type: GraphQLString },
    description: { type: GraphQLString },
    totalAvgRating: { type: GraphQLFloat },
    totalRatingCount: { type: GraphQLFloat },
    totalCommentCount: { type: GraphQLFloat },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    comment: {
      // eslint-disable-next-line global-require
      type: new GraphQLList(require('./movie_comment_type')),
      resolve(parentValue) {
        return db.movieComment.findAll({
          where: { movieId: parentValue.id }
        });
      }
    },
    rating: {
      // eslint-disable-next-line global-require
      type: require('./movie_rating_type'),
      resolve(parentValue, arg, req) {
        return db.movieRating.findOne({
          where: { movieId: parentValue.id, userId: req.user.id }
        });
      }
    }
  })
});

module.exports = MovieType;
