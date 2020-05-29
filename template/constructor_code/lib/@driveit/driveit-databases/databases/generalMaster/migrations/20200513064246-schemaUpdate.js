'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('orderAddData', 'bookingDate', {
        type: Sequelize.DATEONLY,
        allowNull: true
      }),
      queryInterface.changeColumn('orderAddData', 'bookingType', {
        type: Sequelize.STRING(10),
        defaultValue: '',
        allowNull: true
      }),
      queryInterface.changeColumn('orderAddData', 'buyersOrderNo', {
        type: Sequelize.STRING(10),
        defaultValue: '',
        allowNull: true
      }),
      queryInterface.changeColumn('orderAddData', 'buyersOrderDate', {
        type: Sequelize.DATEONLY,
        allowNull: true
      })
    ]);
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
