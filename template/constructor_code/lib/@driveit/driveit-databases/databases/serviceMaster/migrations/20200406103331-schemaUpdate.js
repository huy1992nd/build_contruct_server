'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      
      queryInterface.addColumn('customerTag', 'companyId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('customerTag', 'tenantId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.renameColumn('customerTag', 'tenantBranchId', 'branchId')

    ]).catch((error) => console.log(error));
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