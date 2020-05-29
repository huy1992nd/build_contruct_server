'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.renameColumn('variant', 'fuelTypeId', 'engTypeId'),
      // queryInterface.addColumn('vehicleModel', 'engTypeId', {
      //       type: Sequelize.STRING,
      //       allowNull: true
      // })
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
