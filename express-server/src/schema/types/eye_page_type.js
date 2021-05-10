const graphql = require('graphql');
const EyeTestType = require('./eye_test_type');

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList
} = graphql;

const PageType = new GraphQLObjectType({
  name: 'EyePageType',
  fields: () => ({
    totalPages: { type: GraphQLInt },
    page: { type: GraphQLInt },
    eyeTest: { type: new GraphQLList(EyeTestType) }
  })
});

module.exports = PageType;
