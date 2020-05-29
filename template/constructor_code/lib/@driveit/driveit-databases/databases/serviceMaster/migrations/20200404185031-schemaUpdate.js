'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('bayType', 'companyId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('bayType', 'tenantId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.renameColumn('bayType', 'tenantBranchId', 'branchId')
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
