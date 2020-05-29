'use strict';
const StepStatusEnum = require('../database/models/enums/VehicleStepStatus');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      
      queryInterface.addColumn('vehicle', 'stepStatus', {
        type: Sequelize.ENUM,
        allowNull: true,
        values: [StepStatusEnum.status]
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
