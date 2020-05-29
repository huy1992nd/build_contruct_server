'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('jobServiceModel', 'serviceModelCode', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.changeColumn('jobServiceModel', 'engineCode', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.changeColumn('jobServiceModel', 'bodyTypeId', {
        type: Sequelize.STRING,
        allowNull: true,
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
