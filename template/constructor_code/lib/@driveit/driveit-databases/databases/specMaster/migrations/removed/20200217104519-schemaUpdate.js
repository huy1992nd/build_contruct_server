'use strict';
const StatusEnum = require('../models/enums/Status');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.changeColumn('vehicleUpload', 'uploadFuntionType', {
      //   type: Sequelize.ENUM,
      //   allowNull: true,
      //   values: [StatusEnum.typeVehicleUploadFunction]
      // }),
      queryInterface.changeColumn('vehicleUploadFunction', 'type', {
        type: Sequelize.ENUM,
        allowNull: true,
        values: [StatusEnum.typeVehicleUploadFunction]
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
