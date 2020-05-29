'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.changeColumn('navisionCOSInvoiceHistory', 'seqNo', {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      // }),
      // queryInterface.addColumn('navisionCOSInvoiceHistory', 'recordId', {
      //   type: Sequelize.UUID,
      //   allowNull: false,
      //   primaryKey: true,
      //   defaultValue: Sequelize.UUIDV1,
      // }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
