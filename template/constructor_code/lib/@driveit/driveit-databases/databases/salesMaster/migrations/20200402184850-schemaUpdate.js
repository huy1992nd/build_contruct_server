'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('vehicleBooking', 'companyId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('vehicleBooking', 'tenantId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('vehicleBooking', 'branchId', { type: Sequelize.UUID, allowNull: true }),

      queryInterface.changeColumn('accessoriesFitment', 'companyId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('accessoriesFitment', 'tenantId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('accessoriesFitment', 'branchId', { type: Sequelize.UUID, allowNull: true }),
      
      queryInterface.changeColumn('accessoriesFitmentDocument', 'companyId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('accessoriesFitmentDocument', 'tenantId', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.changeColumn('accessoriesFitmentDocument', 'branchId', { type: Sequelize.UUID, allowNull: true })
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
