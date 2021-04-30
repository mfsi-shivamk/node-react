const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client')

const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient()

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]
  
  // 1
  let idCount = links.length
  const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      feed: () => links,
      user:  async (parent, args, context) => {
          console.log(context.prisma);
        return context.prisma.users.findMany()
      }
    },
    Mutation: {
      // 2
      post: (parent, args) => {
         const link = {
          id: `link-${idCount++}`,
          description: args.description,
          url: args.url,
        }
        links.push(link)
        return link
      }
    },
  }
const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: {
    prisma,
  }
});
server .listen(4002) .then(({ url }) => console.log(`Server is running on ${url}`) );