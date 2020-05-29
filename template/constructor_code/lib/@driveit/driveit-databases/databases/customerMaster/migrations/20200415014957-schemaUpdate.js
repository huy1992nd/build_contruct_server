'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('customerContact', 'telCode', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('customerContact', 'faxCode', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('customerContact', 'mobileCode', {
        type: Sequelize.STRING,
        allowNull: true,
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
