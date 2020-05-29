'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return Promise.all( [
    queryInterface.describeTable('distributionChannel').then(tableDefinition => { if (tableDefinition){
      queryInterface.dropTable('businessType').then(() => {
             return queryInterface.renameTable('distributionChannel', 'businessType');
           });
      } else { return Promise.resolve(true); } }).catch(() => {       return Promise.resolve(true); })
  ]);
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
