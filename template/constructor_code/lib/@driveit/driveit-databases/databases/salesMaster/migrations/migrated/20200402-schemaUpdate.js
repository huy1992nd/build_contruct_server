'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('discretionaryMarginLimit', 'bookingEffectiveStartDate', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.changeColumn('discretionaryMarginLimit', 'bookingEffectiveEndDate', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.changeColumn('discretionaryMarginLimit', 'registrationEffectiveStartDate', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.changeColumn('discretionaryMarginLimit', 'registrationEffectiveEndDate', {
        type: Sequelize.STRING,
        allowNull: true
      })
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
