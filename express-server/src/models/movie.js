module.exports = (sequelize, DataTypes) => {
  const movie = sequelize.define('movie', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    actorInfo: DataTypes.TEXT,
    totalAvgRating: DataTypes.INTEGER,
    productId: DataTypes.STRING,
    priceId: DataTypes.STRING,
    price: DataTypes.STRING,
    currency: DataTypes.STRING,
    totalRatingCount: DataTypes.INTEGER
  }, {});
  // eslint-disable-next-line func-names
  movie.associate = function (models) {
    // associations can be defined here
    models.movie.hasMany(models.movieComment, { foreignKey: 'userId' });
    models.movie.hasMany(models.movieRating, { foreignKey: 'movieId' });
  };
  return movie;
};
