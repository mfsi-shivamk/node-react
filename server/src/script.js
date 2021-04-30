// 1
const { PrismaClient } = require("@prisma/client")

// 2
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})
prisma.$on('query', e => {
  console.log("Query: " + e.query)
  console.log("Duration: " + e.duration + "ms")
})
//3
async function main() {
    console.log(prisma);
  const allUsers = await prisma.users.findMany()
  console.log(allUsers)
}

//4
main()
  .catch(e => {
    throw e
  })
  // 5
  .finally(async () => {
    await prisma.$disconnect()
  })