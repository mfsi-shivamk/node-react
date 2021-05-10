const graphql = require('graphql');
const { db } = require('../../models');
const MovieType = require('./movie_type');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList
} = graphql;

const PageType = new GraphQLObjectType({
  name: 'PageType',
  fields: () => ({
      totalPages: { type: GraphQLInt },
      page: { type: GraphQLInt },
      movie: { type: new GraphQLList(MovieType) }
  })
});

module.exports = PageType;
