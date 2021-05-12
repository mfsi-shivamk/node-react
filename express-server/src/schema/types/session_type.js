const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLID
} = graphql;

const SessionType = new GraphQLObjectType({
  name: 'SessionType',
  fields: () => ({
    id: { type: GraphQLID }
  })
});

module.exports = SessionType;
