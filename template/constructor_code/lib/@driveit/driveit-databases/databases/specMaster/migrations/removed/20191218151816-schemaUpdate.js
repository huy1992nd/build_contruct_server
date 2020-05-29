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
      queryInterface.addColumn('mileageHistory', 'oldLastMileage', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
      queryInterface.addColumn('mileageHistory', 'oldPrevMileage', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
      queryInterface.addColumn('mileageHistory', 'oldLastEngineHour', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
      queryInterface.addColumn('mileageHistory', 'oldPrevEngineHour', {
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
