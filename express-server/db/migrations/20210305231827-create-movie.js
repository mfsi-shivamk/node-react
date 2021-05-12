

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('movies', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    actorInfo: {
      type: Sequelize.TEXT
    },
    totalAvgRating: {
      type: Sequelize.DECIMAL(10, 2)
    },
    totalRatingCount: {
      type: Sequelize.INTEGER
    },
    totalCommentCount: {
      type: Sequelize.INTEGER
    },
    productId: {
      type: Sequelize.INTEGER
    },
    priceId: {
      type: Sequelize.INTEGER
    },
    currency: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('movies')
};
