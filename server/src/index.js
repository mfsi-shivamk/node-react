const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Sms = require('./resolvers/Sms')
const Date = require('./resolvers/Date')
const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client')
const { getUserId } = require('./utils');

const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient()

  // const resolvers = {
  //   Query: {
  //     info: () => `This is the API of a Hackernews Clone`,
  //     feed: () => links,
  //     user:  async (parent, args, context) => {
  //       return context.prisma.users.findMany()
  //     }
  //   },
  //   Mutation: {
  //     // 2
  //     post: (parent, args) => {
  //        const link = {
  //         id: `link-${idCount++}`,
  //         description: args.description,
  //         url: args.url,
  //       }
  //       links.push(link)
  //       return link
  //     }
  //   },
  // }
  const resolvers = {
    Query,
    Mutation,
    User,
    Sms,
    Date
  }
  const server = new ApolloServer({
    typeDefs: fs.readFileSync(
      path.join(__dirname, 'schema.graphql'),
      'utf8'
    ),
    resolvers,
    context: ({ req }) => {
      return {
        ...req,
        prisma,
        userId:
          req && req.headers.authorization
            ? getUserId(req)
            : null
      };
    }
  });
server .listen(4002) .then(({ url }) => console.log(`Server is running on ${url}`) );