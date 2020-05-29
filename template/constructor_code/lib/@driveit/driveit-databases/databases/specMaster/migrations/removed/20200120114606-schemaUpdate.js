'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('product', 'jpjModel', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('product', 'vtaSerialNo', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('product', 'vtaApprovalDate', {
        type: Sequelize.STRING,
        allowNull: true
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
