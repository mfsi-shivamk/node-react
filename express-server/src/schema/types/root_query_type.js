const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLList, GraphQLString, GraphQLFloat,GraphQLInt } = graphql;
const UserType = require('./user_type');
const SmsType = require('./sms_type');
const MovieType = require('./movie_type');
const PageType = require('./page_type');
const EyePageType = require('./eye_page_type');
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
        }).catch(e => new Error('SERVER_ERROR'))
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
        }).catch(e => new Error('SERVER_ERROR'))
      },
    },
    
    eyeTest: {
      type: EyePageType,
      args: {
          limit: { type: GraphQLInt },
          filter: { type: GraphQLString },
          page: { type: GraphQLInt }
      },
      resolve(parentValue, args, req) {
        const where = args.filter ? { name: { $like: "%"+args.filter+"%"}} : {}
        const limit = args.limit ? args.limit : 3;
        const page = args.page ? args.page : 1;
        return db.movie.count({
          where
        })
        .then(totalCount => {
          const pages = Math.ceil(totalCount / limit);
          const offset = limit * (page - 1);
          return db.eyeTest.findAll({
            order:[['id','DESC']],
            where,
            limit,
            offset
          }).then(r => [JSON.parse(JSON.stringify(r)), pages || 0])
        })
        .then(([eyeTest,totalPages])=>{
          return {eyeTest,totalPages, page};
        }).catch(e => new Error('SERVER_ERROR'))
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
        const where = args.filter ? { name: { $like: "%"+args.filter+"%"}} : {}
        const limit = args.limit ? args.limit : 3;
        const page = args.page ? args.page : 1;
        return db.movie.count({
          where
        })
        .then(totalCount => {
          const pages = Math.ceil(totalCount / limit);
          const offset = limit * (page - 1);
          return db.movie.findAll({
            order:[['id','DESC']],
            where,
            limit,
            offset
          }).then(r => [JSON.parse(JSON.stringify(r)), pages || 0])
        })
        .then(([movie,totalPages])=>{
          return {movie,totalPages, page};
        }).catch(e => new Error('SERVER_ERROR'))
      },
    }
  })
});

module.exports = RootQueryType;
