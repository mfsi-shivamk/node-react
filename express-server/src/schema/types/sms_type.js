const graphql = require('graphql');
const { db } = require('../../models');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql;

const SmsType = new GraphQLObjectType({
  name: 'SmsType',
  fields: ()=>({
    id: { type: GraphQLID },
    body: { type: GraphQLString },
    key: { type: GraphQLString },
    otp: { type: GraphQLString },
    sentAt: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    deletedAt: { type: GraphQLString },
    user: {
      type: require('./user_type'),
      resolve(parentValue, args, req) {
        return db.User.findOne({
          where: {id: req.user.id}
        })
      }
    }
  })
});

module.exports = SmsType;
