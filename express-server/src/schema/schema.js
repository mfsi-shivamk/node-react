const graphql = require('graphql');
const { GraphQLObjectType, GraphQLSchema } = graphql;
import { PubSub } from 'graphql-subscriptions';
import MovieType from './types/movie_type';

const RootQueryType = require('./types/root_query_type');
const mutation = require('./mutations');
const subscription = require('./subscription');
// const mutation = require('./mutations');
const pubSub = new PubSub();

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation,
  subscription
});
