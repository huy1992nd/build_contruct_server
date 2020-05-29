'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('repairOrder', 'clockInAction', {
        type: Sequelize.BOOLEAN,
        defaultValue: true, //means clocked-in
        allowNull: true
      }),
      queryInterface.addColumn('repairOrder', 'clockInDateTime', {
        type: Sequelize.STRING,
        allowNull: true
      })
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
