'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Books', 'key', {
      type: Sequelize.STRING,
      allowNull: true, // or false, depending on your requirement
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Books', 'key');
  }
};
