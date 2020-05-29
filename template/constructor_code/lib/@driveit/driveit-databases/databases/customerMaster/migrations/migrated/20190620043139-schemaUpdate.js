'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all( [
    queryInterface.dropTable('branch'),  
    queryInterface.renameTable('plant', 'branch'),
    queryInterface.renameColumn(
      'plantDistributionChannel',
      'plantId',
      'branchId'
     ),
    queryInterface.changeColumn(
      'plantDistributionChannel',
      'branchId',
      {
        type: Sequelize.UUID,
      }
     ),
     queryInterface.sequelize.query("ALTER TABLE plantDistributionChannel ADD CONSTRAINT plantdistributionchannel_branchId_fkey FOREIGN KEY (branchId) REFERENCES branch (id);")
    ] )
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
