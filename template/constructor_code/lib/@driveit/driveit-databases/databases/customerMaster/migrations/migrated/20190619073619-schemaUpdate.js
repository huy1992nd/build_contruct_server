'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return Promise.all([
    queryInterface.changeColumn('plantDistributionChannel','businessTypeId', 
      { type: Sequelize.UUID}).then(() => {
      return queryInterface.sequelize.query('ALTER TABLE plantDistributionChannel ADD CONSTRAINT plantdistributionchannel_businessTypeId_fkey FOREIGN KEY (businessTypeId) REFERENCES businessType (id);');
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
