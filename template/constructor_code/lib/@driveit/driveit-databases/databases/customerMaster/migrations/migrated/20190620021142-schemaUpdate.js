'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint('plantStorageLocation', 'plantStorageLocation_ibfk_3').catch(() => { return Promise.resolve(true);}),
      queryInterface.describeTable('plantDistributionChannel').then(tableDefinition => {
        if (tableDefinition['distributionChannelId']){
          return queryInterface.removeColumn('storageLocation', 'areaOfUsageId')
        } else { return Promise.resolve(true); } })
      .catch(() => { return Promise.resolve(true); })
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
