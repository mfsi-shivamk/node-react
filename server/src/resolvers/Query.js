function sms(parent, args, context, info) {
    return context.prisma.sms.findMany()
  }
  
  module.exports = {
    sms,
  }