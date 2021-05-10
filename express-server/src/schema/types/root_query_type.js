const graphql = require('graphql');

const {
  GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt
} = graphql;
const UserType = require('./user_type');
const PageType = require('./page_type');
const EyePageType = require('./eye_page_type');
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

    eyeTest: {
      type: EyePageType,
      args: {
        limit: { type: GraphQLInt },
        filter: { type: GraphQLString },
        page: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        const where = args.filter ? { name: { $like: `%${args.filter}%` } } : {};
        const limit = args.limit ? args.limit : 3;
        const page = args.page ? args.page : 1;
        return db.movie.count({
          where
        })
          .then((totalCount) => {
            const pages = Math.ceil(totalCount / limit);
            const offset = limit * (page - 1);
            return db.eyeTest.findAll({
              order: [['id', 'DESC']],
              where,
              limit,
              offset
            }).then(r => [JSON.parse(JSON.stringify(r)), pages || 0]);
          })
          .then(([eyeTest, totalPages]) => ({ eyeTest, totalPages, page })).catch(() => new Error('SERVER_ERROR'));
      },
    },
    movie: {
      type: PageType,
      args: {
        limit: { type: GraphQLInt },
        filter: { type: GraphQLString },
        page: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
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
              where,
              limit,
              offset
            }).then(r => [JSON.parse(JSON.stringify(r)), pages || 0]);
          })
          .then(([movie, totalPages]) => ({ movie, totalPages, page })).catch(() => new Error('SERVER_ERROR'));
      },
    }
  })
});

module.exports = RootQueryType;
