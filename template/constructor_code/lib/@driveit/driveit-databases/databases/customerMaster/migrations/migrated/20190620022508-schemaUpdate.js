'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.describeTable('plantStorageLocation').then(tableDefinition => {
      if (tableDefinition['areaOfUsageId']){
        return queryInterface.removeColumn('plantStorageLocation', 'areaOfUsageId')
              .catch(() => { return Promise.resolve(true);});
      } else { return Promise.resolve(true); } 
    })
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
