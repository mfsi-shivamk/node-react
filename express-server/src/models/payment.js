'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    userId: DataTypes.INTEGER,
    sessionId: DataTypes.STRING,
    sessionId: DataTypes.STRING,
    paymentId: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  Payment.associate = function(models) {
    models.Payment.belongsTo(models.User, { foreignKey: 'userId' });
    models.Payment.belongsTo(models.movie, { foreignKey: 'movieId' });
  };
  return Payment;
};