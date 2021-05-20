

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
    count: {
      type: Sequelize.INTEGER
    },
    actorInfo: {
      type: Sequelize.TEXT
    },
    price: {
      type: Sequelize.STRING
    },
    currency: {
      type: Sequelize.STRING
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
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    key: {
      type: Sequelize.STRING
    },
    priceId: {
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
