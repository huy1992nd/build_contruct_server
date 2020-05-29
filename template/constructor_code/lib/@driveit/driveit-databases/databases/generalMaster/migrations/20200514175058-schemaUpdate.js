'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
      queryInterface.renameColumn('invoicePayment', 'ORitem__typecode', 'ORitem_typecode'),
      queryInterface.renameColumn('invoicePayment', 'createdby', 'createdBy'),
      queryInterface.renameColumn('invoicePayment', 'modifiedby', 'updatedBy')
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
