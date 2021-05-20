module.exports = (sequelize, DataTypes) => {
  const movie = sequelize.define('movie', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    count: DataTypes.INTEGER,
    actorInfo: DataTypes.TEXT,
    price: DataTypes.STRING,
    currency: DataTypes.STRING,
    totalAvgRating: DataTypes.INTEGER,
    totalRatingCount: DataTypes.INTEGER,
    totalCommentCount: DataTypes.INTEGER,
    productId: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    key: DataTypes.STRING,
    priceId: DataTypes.STRING
  }, {});
  // eslint-disable-next-line func-names
  movie.associate = function (models) {
    // associations can be defined here
    // models.movie.belongsTo(models.User, { foreignKey: 'userId' });
    models.movie.hasMany(models.movieComment, { foreignKey: 'movieId' });
    models.movie.hasMany(models.movieRating, { foreignKey: 'movieId' });
  };
  return movie;
};
