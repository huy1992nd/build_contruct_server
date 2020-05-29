'use strict';
const StatusEnum = require('../models/enums/Status');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.sequelize.query(`update service_master.repairOrder set roStatus = 'pending_qc' where roStatus in ('qc_checked', 'job_completed')`);
      return Promise.all([
        queryInterface.changeColumn('repairOrder', 'roStatus', {
          type: Sequelize.ENUM,
          allowNull: true,
          values: [StatusEnum.roStatusNew],
          defaultValue: StatusEnum.NEW,
        })
      ]);
    } catch (e) {
      return Promise.reject(e);
    }
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
