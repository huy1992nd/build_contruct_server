'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('eVoucher', 'companyId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('eVoucher', 'tenantId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('eVoucher', 'branchId', { type: Sequelize.UUID, allowNull: true }),

    ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
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
