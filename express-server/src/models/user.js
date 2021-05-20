import bcrypt from 'bcrypt-nodejs';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    stripeId: DataTypes.STRING,
    key: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    timestamps: true,
    paranoid: true,
  });
  User.associate = function (models) {
    models.User.hasMany(models.movieComment, { foreignKey: 'userId' });
    models.User.hasMany(models.movieRating, { foreignKey: 'userId' });
    models.User.hasMany(models.movie, { foreignKey: 'movieId' });
  };
  User.prototype.comparePassword = function (password) {
    const dbPass = this.getDataValue('key');
    return bcrypt.compareSync(password, dbPass);
  };
  return User;
};
