'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('vehicle', 'companyId', {
        type: Sequelize.UUID,
        allowNull: true
      }),
      queryInterface.changeColumn('vehicle', 'branchId', {
        type: Sequelize.UUID,
        allowNull: true
      })
      
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
