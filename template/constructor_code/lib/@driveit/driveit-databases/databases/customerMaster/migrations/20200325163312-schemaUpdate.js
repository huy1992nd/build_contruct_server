'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        // queryInterface.dropTable('dropPoint'),
        // queryInterface.dropTable('branchStorageLocation'),
  
        // queryInterface.removeColumn('storageLocation', 'code', { transaction: t }),
        // queryInterface.removeColumn('storageLocation', 'name', { transaction: t }),

        queryInterface.addColumn('storageLocation', 'branchId', {
          type: Sequelize.STRING,
          allowNull: false
        }, { transaction: t }),
        queryInterface.addColumn('storageLocation', 'storageId', {
          type: Sequelize.STRING,
          allowNull: false
        }, { transaction: t }),
        queryInterface.addColumn('storageLocation', 'followMainAddress', {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }, { transaction: t }),
      ])
    });
    
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
