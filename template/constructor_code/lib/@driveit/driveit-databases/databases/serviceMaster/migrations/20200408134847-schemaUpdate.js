'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('appointments', 'email', {  type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('appointments', 'chassisNo', {  type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('appointments', 'idNumber', {  type: Sequelize.STRING, allowNull: true })
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
