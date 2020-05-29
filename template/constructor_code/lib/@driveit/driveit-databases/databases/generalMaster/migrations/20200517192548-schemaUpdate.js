'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  return queryInterface.describeTable('navisionSalesInvoiceHistory')
    .then(tableDefinition => {
      if (!tableDefinition['fileId']) { // if column not exist, add column
        return queryInterface.addColumn('navisionSalesInvoiceHistory', 'fileId', {
          type: Sequelize.UUID,
          allowNull: true
        })
      } 
      return Promise.resolve();
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
