'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('materialStorage', 'storageBranch', { transaction: t }),
        queryInterface.removeColumn('materialStorage', 'storageBranchName', { transaction: t }),
        queryInterface.removeColumn('materialStorage', 'storageLocationName', { transaction: t }),

        // queryInterface.renameColumn('materialStorage', 'storageId', 'materialId'),
      ])
    });
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
