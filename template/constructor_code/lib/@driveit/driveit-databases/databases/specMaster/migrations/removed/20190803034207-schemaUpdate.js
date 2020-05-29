'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('variant', 'vtaSerialNo', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.addColumn('variant', 'vtaApprovalDate', { type: Sequelize.DATE, onUpdate: 'cascade', onDelete: 'SET NULL'}),
      queryInterface.addColumn('variant', 'wheelDriveId', { type: Sequelize.STRING, onUpdate: 'cascade', onDelete: 'SET NULL'}),
    ]);
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
