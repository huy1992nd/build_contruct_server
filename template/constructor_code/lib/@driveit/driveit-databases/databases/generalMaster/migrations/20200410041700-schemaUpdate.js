'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('vendorCommunication', 'cTelCode', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.addColumn('vendorCommunication', 'cFaxCode', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.addColumn('vendorCommunication', 'faxCode', { type: Sequelize.UUID, allowNull: true }),
      queryInterface.addColumn('vendorCommunication', 'telCode', { type: Sequelize.UUID, allowNull: true })
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
