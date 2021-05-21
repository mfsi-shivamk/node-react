const graphql = require('graphql');
const { db } = require('../../models');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql;

const PaymentType = new GraphQLObjectType({
  name: 'PaymentType',
  fields: () => ({
    id: { type: GraphQLID },
    status: { type: GraphQLString },
    userId: { type: GraphQLID },
    movieId: { type: GraphQLID },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
});

module.exports = PaymentType;
