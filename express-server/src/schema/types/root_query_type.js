const graphql = require('graphql');

const {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt
} = graphql;
const UserType = require('./user_type');
const PageType = require('./page_type');
const { db } = require('../../models');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: new GraphQLNonNull(UserType),
      resolve(parentValue, args, req) {
        return db.User.findOne({
          where: {
            id: req.user.id
          }
        }).catch(() => new Error('SERVER_ERROR'));
      },
    },
    movie: {
      type: PageType,
      args: {
        limit: { type: GraphQLInt },
        filter: { type: GraphQLString },
        page: { type: GraphQLInt }
      },
      resolve(parentValue, args, req) {
        const where = args.filter ? { name: { $like: `%${args.filter}%` } } : {};
        const limit = args.limit ? args.limit : 3;
        const page = args.page ? args.page : 1;
        return db.movie.count({
          where
        })
          .then((totalCount) => {
            const pages = Math.ceil(totalCount / limit);
            const offset = limit * (page - 1);
            return db.movie.findAll({
              order: [['id', 'DESC']],
              attributes: [`id`,
                [db.sequelize.literal("CASE  WHEN userId = "+req.user.id+" AND `key` IS NULL THEN 1 ELSE 0 END"), 'upload'],
                [db.sequelize.literal("CASE  WHEN userId <> "+req.user.id+" AND `key` IS NOT NULL THEN 1 ELSE 0 END"), 'buy'],
                `name`, `description`, `count`, `actorInfo`, `price`, `currency`, `totalAvgRating`, `totalRatingCount`, `totalCommentCount`, `productId`, `userId`, `priceId`, `createdAt`, `updatedAt`],
              where,
              limit,
              offset
            }).then(r => [JSON.parse(JSON.stringify(r)), pages || 0]);
          })
          .then(([movie, totalPages]) => ({ movie, totalPages, page })).catch((e) =>{ console.log(e);return new Error('SERVER_ERROR')});
      },
    }
  })
});

module.exports = RootQueryType;
