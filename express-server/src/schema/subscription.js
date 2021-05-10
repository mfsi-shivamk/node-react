const graphql = require('graphql');

const { GraphQLObjectType } = graphql;
const MovieType = require('./types/movie_type');

const subscription = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    movieAdded: {
      type: MovieType,
      resolve: payload => payload,
      // eslint-disable-next-line no-undef
      subscribe: () => pubSub.asyncIterator('movieAdded'),
    },
  }
});

module.exports = subscription;
