'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const authMaster = require('../../auth');
    return Promise.all([
      
        authMaster.InternalUsers.upsert({
          id: 'OFFICE_SALE',
          fullName: 'OFFICE SALE',
          role: 'no-access',
          createdBy: 'ADMIN',
          updatedBy: 'ADMIN'
        }),
        queryInterface.sequelize.query("UPDATE vehicleBooking SET salesPersonId = 'OFFICE_SALE' WHERE salesPersonId IS NULL OR salesPersonId = '';"),
        queryInterface.changeColumn('vehicleBooking', 'salesPersonId', {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: 'OFFICE_SALE',
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