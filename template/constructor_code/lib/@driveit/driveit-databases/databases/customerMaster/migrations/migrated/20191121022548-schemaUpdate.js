'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('customerContact', 'mareaOperatorCode', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('customerContact', 'tareaOperatorCode', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('customerContact', 'fareaOperatorCode', {
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
