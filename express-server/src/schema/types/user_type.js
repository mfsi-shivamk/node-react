const graphql = require('graphql');
const { db } = require('../../models');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: ()=>({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    key: { type: GraphQLString },
    phone: { type: GraphQLString },
    smsSent: {
      type: require('./sms_type'),
      resolve(parentValue, arg, req) {
        return db.Sms.findAll({
          where: { status: 'success', userId: req.user.id }
        })
      }
    }
  })
});

module.exports = UserType;
