module.exports = (sequelize, DataTypes) => {
  const eyeTest = sequelize.define('eyeTest', {
    userId: DataTypes.INTEGER,
    score1: DataTypes.INTEGER,
    score2: DataTypes.INTEGER,
    score3: DataTypes.INTEGER,
    name: DataTypes.STRING,
  }, {});
  eyeTest.associate = function (models) {
    // associations can be defined here
    models.eyeTest.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return eyeTest;
};
