'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('leadCustomer', 'mareaOperatorCode', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('leadCustomer', 'tareaOperatorCode', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('leadCustomer', 'fareaOperatorCode', {
        type: Sequelize.STRING,
        allowNull: true
      }),
    ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      
    ])
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
