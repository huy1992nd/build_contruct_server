'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const jobStatus = require('../models/enums/Status').jobStatus;
    const StatusEnum = require('../models/enums/Status');
    return Promise.all([
      queryInterface.changeColumn('preRepairOrderFlatRate', 'status',
        {
          type: Sequelize.ENUM,
          allowNull: false,
          defaultValue: StatusEnum.NEW,
          values: [jobStatus]
        }),
      queryInterface.changeColumn('repairOrderFlatRate', 'status',
        {
          type: Sequelize.ENUM,
          allowNull: false,
          defaultValue: StatusEnum.NEW,
          values: [jobStatus]
        }),
      queryInterface.changeColumn('warrantyClaimIncidentJobs', 'status',
        {
          type: Sequelize.ENUM,
          allowNull: false,
          defaultValue: StatusEnum.NEW,
          values: [jobStatus]
        })
    ]).catch((error) => console.log(error));
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
