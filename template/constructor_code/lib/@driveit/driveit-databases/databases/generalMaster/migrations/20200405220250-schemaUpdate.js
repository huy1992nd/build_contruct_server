'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('campaignType', 'companyId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('campaignType', 'tenantId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.renameColumn('campaignType', 'tenantBranchId', 'branchId')

      // queryInterface.changeColumn('campaignType', 'branchId', { type: Sequelize.UUID, allowNull: true }),
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
