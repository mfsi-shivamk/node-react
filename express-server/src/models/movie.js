module.exports = (sequelize, DataTypes) => {
  const movie = sequelize.define('movie', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    actorInfo: DataTypes.TEXT,
    totalAvgRating: DataTypes.INTEGER,
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
