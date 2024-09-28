'use strict';

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add the 'cover_i' column  in the 'Books' table
    await queryInterface.addColumn('Books', 'cover_i', {
      type: Sequelize.STRING,  
      allowNull: true           // Set allowNull to true or false as per your needs
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove the 'cover_i' column if the migration is rolled back
    await queryInterface.removeColumn('Books', 'cover_i');
  }
};
