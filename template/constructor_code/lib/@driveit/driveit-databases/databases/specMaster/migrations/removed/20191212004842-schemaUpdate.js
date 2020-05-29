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
      queryInterface.addColumn('vehicle', 'accuMileage', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
      queryInterface.addColumn('vehicle', 'accuEngineHour', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
      queryInterface.addColumn('vehicle', 'billingAccuMileage', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
      queryInterface.addColumn('vehicle', 'billingAccuEngineHour', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
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
