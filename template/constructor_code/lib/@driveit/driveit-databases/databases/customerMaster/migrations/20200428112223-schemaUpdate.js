'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('customerFinance', 'customerGroupId', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.changeColumn('customerFinance', 'companyId', { type: Sequelize.STRING, allowNull: true }),

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
