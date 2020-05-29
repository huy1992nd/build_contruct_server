'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return Promise.all([
    queryInterface.removeColumn('branch', 'fareaOperatorCode'),
    queryInterface.removeColumn('branch', 'tareaOperatorCode'),
    queryInterface.removeColumn('branch', 'mareaOperatorCode'),
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
