const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils');
const createDate = () => { return { createdAt: new Date(), updatedAt: new Date() }}
async function signup(parent, args, context, info) {
    // 1
  console.log("signup", args);

    const key = await bcrypt.hash(args.key, 10)

    // 2
    const user = await context.prisma.users.create({ data: { ...args, key, ...createDate() } })
  
    // 3
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
  
    // 4
    return {
      token,
      user,
    }
  }
  
  async function login(parent, args, context, info) {
    // 1
  console.log(1);

    const user = await context.prisma.users.findUnique({ where: { email: args.email } })
    if (!user) {
      throw new Error('No such user found')
    }
  
    // 2
    const valid = await bcrypt.compare(args.key, user.key)
    if (!valid) {
      throw new Error('Invalid password')
    }
  
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
  
    // 3
    return {
      token,
      user,
    }
  }
  async function post(parent, args, context, info) {

    const { userId } = context;
  
    return await context.prisma.sms.create({
      data: {
        otp: args.otp,
        body: args.body,
        Users: { connect: { id: userId } },
        ...createDate(),
        deletedAt: null
      }
    })
  }
  module.exports = {
    signup,
    login,
    post,
  }