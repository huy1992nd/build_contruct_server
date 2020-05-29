'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('orderListSetup', 'registrationRegionId', {
        type: Sequelize.UUID,
        defaultValue: '00000000-0000-0000-0000-000000000000',
        allowNull: true 
      }),
      
      queryInterface.addColumn('orderListSetup', 'registrationRegion', { 
        type: Sequelize.STRING, 
        allowNull: true 
      }),

      queryInterface.addColumn('orderListSetup', 'dropPointId', {
        type: Sequelize.UUID,
        defaultValue: '00000000-0000-0000-0000-000000000000',
        allowNull: true 
      }),

      queryInterface.addColumn('orderListSetup', 'dropPoint', { 
        type: Sequelize.STRING, 
        allowNull: true 
      }),

      queryInterface.addColumn('orderListSetup', 'optionalItemId', {
        type: Sequelize.STRING(1000),
        allowNull: true 
      }),

      queryInterface.addColumn('orderListSetup', 'optionalItem', {
        type: Sequelize.STRING(1000),
        allowNull: true 
      }),

      queryInterface.changeColumn('orderListSetup', 'optionalPackageId', {
        type: Sequelize.STRING(1000),
        allowNull: true,
      }),

      queryInterface.changeColumn('orderListSetup', 'optionalPackage', {
        type: Sequelize.STRING(1000),
        allowNull: true,
      }),
    ]);
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
