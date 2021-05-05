const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLID } = graphql;
const MovieType = require('./types/movie_type');
const subscription = new GraphQLObjectType({
  name: "Subscription",
  fields: {
      movieAdded: {
        type: MovieType,
        resolve: payload => payload,
        subscribe: () => pubSub.asyncIterator('movieAdded'),
      },
  }
});;
module.exports = subscription;