'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.addColumn('bookingFee', 'deleted', {
      //   type: Sequelize.BOOLEAN,
      //   allowNull: true,
      //   defaultValue: false
      // }),
    ]);    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
