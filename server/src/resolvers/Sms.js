function userId(parent, args, context) {
  console.log();(parent.id)
  context.prisma.Sms.findUnique({ where: { id: parent.id } }).then(r => {
    console.log(r);
  })
    return context.prisma.Sms.findUnique({ where: { id: parent.id } }).userId()
  }
  
  module.exports = {
    userId,
  }