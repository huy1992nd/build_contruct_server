'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('variant', 'bookingAvailability'),
      queryInterface.changeColumn('variant', 'cc', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.changeColumn('variant', 'seatingCapacity', {
        type: Sequelize.INTEGER,
        allowNull: true
      })
    ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      
    ])
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
