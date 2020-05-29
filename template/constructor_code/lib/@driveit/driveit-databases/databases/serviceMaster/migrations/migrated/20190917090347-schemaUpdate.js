'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('repairOrder', 'roCreationDate', {
        type: Sequelize.DATE,
        allowNull:true
      }),
      queryInterface.addColumn('repairOrder', 'roPrintDate', {
        type: Sequelize.DATE,
        allowNull:true
      }),
      queryInterface.addColumn('repairOrder', 'roReleasedDate', {
        type: Sequelize.DATE,
        allowNull:true
      }),
    ])
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
