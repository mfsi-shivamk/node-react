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
    description: { type: GraphQLString },
    count: { type: GraphQLFloat },
    actorInfo: { type: GraphQLString },
    price: { type: GraphQLString },
    currency: { type: GraphQLString },
    totalAvgRating: { type: GraphQLFloat },
    totalRatingCount: { type: GraphQLFloat },
    totalCommentCount: { type: GraphQLFloat },
    productId: { type: GraphQLString },
    userId: { type: GraphQLFloat },
    key: { type: GraphQLString },
    priceId: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    upload: { type: GraphQLFloat },
    buy: { type: GraphQLFloat },
    comment: {
      // eslint-disable-next-line global-require
      type: new GraphQLList(require('./movie_comment_type')),
      resolve(parentValue) {
        return db.movieComment.findAll({
          where: { movieId: parentValue.id }
        });
      }
    },
    payment: {
      // eslint-disable-next-line global-require
      type: new GraphQLList(require('./payment_type')),
      resolve(parentValue, arg, req) {
        return db.Payment.findAll({
          where: { movieId: parentValue.id, userId: req.user.id }
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
