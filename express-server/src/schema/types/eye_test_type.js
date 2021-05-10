/* eslint-disable global-require */
const graphql = require('graphql');
const { db } = require('../../models');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLFloat
} = graphql;

const EyeTest = new GraphQLObjectType({
  name: 'EyeTestType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    score1: { type: GraphQLFloat },
    score2: { type: GraphQLFloat },
    score3: { type: GraphQLFloat },
    user: {
      type: require('./user_type'),
      resolve(parentValue, args, req) {
        return db.User.findOne({
          where: { id: req.user.id }
        });
      }
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
});

module.exports = EyeTest;
