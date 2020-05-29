'use strict';
const StatusEnum = require('../models/enums/Status');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      /*
      queryInterface.addColumn('vehicleUpload', 'uploadFuntionType', {
        type: Sequelize.ENUM,
        allowNull: true,
        values: [StatusEnum.typeVehicleUploadFunction]
      }),
      queryInterface.addColumn('vehicleUpload', 'uploadFunctionName', {
        type: Sequelize.STRING,
        allowNull:true
      })
      */
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
