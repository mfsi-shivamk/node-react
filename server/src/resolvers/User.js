function smsSent(parent, args, context) {
  return context.prisma.users.findUnique({ where: { id: parent.id } }).Sms()
}
  
module.exports = {
  smsSent,
}