'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('recallMasterItems', 'partsUoM', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('recallMasterItems', 'materialMasterId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('recallMasterItems', 'materialId', {
        type: Sequelize.STRING,
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
