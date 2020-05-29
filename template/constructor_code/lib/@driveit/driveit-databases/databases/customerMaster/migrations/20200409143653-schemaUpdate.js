'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('customerDetails', 'telCode', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('customerDetails', 'faxCode', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('customerDetails', 'mobileCode', {
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
