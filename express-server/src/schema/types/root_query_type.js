const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLList, GraphQLString, GraphQLFloat,GraphQLInt } = graphql;
const UserType = require('./user_type');
const SmsType = require('./sms_type');
const MovieType = require('./movie_type');
const { db } = require('../../models');
const {
  Page,
  convertNodeToCursor,
  convertCursorToNodeId
} = require('./pagination');
const { json } = require('sequelize');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: new GraphQLNonNull(UserType),
      resolve(parentValue, args, req) {
        return db.User.findOne({
          where : {
            id: req.user.id
          }
        })
      },
    },
    sms: {
      type: SmsType,
      resolve(parentValue, args, req) {
        return db.Sms.findOne({
          where : {
            id: parentValue.id,
            userId: req.user.id
          }
        })
      },
    },
    movie: {
      type: new GraphQLObjectType({
        name: 'PageType',
        fields: () => ({
            totalCount: { type: GraphQLInt },
            movie: { type: new GraphQLList(MovieType) }
        })
    }),
      args: {
          limit: { type: GraphQLInt },
          filter: { type: GraphQLString },
          offset: { type: GraphQLInt }
      },
      resolve(parentValue, args, req) {
        const where = args.filter ? { name: { $like: "%"+args.filter+"%"}} : {}
        const limit = args.limit ? args.limit : 10;
        const offset = args.offset ? args.offset : 0;
        return db.movie.count({
          where
        })
        .then(totalCount => {
          return db.movie.findAll({
            order:[['id','DESC']],
            where,
            limit,
            offset
          }).then(r => [JSON.parse(JSON.stringify(r)), totalCount])
        })
        .then(([movie,totalCount])=>{
          return {movie,totalCount};
        })
      },
    }
  })
});

module.exports = RootQueryType;
