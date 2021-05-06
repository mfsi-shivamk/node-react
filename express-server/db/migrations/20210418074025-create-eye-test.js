

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('eyeTests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    score1: {
      type: Sequelize.INTEGER
    },
    score2: {
      type: Sequelize.INTEGER
    },
    score3: {
      type: Sequelize.INTEGER
    },
    name: {
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
  down: queryInterface => queryInterface.dropTable('eyeTests')
};
