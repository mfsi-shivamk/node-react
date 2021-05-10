
import RootQueryType from './types/root_query_type';
import mutation from './mutations';
import subscription from './subscription';

const graphql = require('graphql');

const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation,
  subscription
});
