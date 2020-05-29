'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('storageLocation', 'areaOperatorCodeId'),

      queryInterface.addColumn('storageLocation', 'telId', {
        type: Sequelize.UUID,
        allowNull: true,
      }),
      queryInterface.addColumn('storageLocation', 'faxId', {
        type: Sequelize.UUID,
        allowNull: true,
      }),
      queryInterface.addColumn('storageLocation', 'contactId', {
        type: Sequelize.UUID,
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
