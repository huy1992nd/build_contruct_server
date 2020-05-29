'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.describeTable('plantDistributionChannel').then(tableDefinition => { 
      if (tableDefinition['distributionChannelId']){
    return queryInterface.renameColumn('plantDistributionChannel', 'distributionChannelId', 'businessTypeId');
  } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true); })
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