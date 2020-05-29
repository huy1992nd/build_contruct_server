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
      queryInterface.addColumn('vehicleSalesServiceHistory', 'nextRecommendedMileage', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
      queryInterface.addColumn('vehicleSalesServiceHistory', 'nextRecommendedDate', {
        type: Sequelize.DATEONLY,
        allowNull: true
      })
    ]).catch(error => {
      console.error('ERROR migration vehicleSalesServiceHistory: ', error);
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
