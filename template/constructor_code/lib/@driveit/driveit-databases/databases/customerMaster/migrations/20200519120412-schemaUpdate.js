'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return Promise.all([
        queryInterface.changeColumn('sample', 'code', {
          type: Sequelize.STRING,
          allowNull: false
        }),
        queryInterface.changeColumn('sample', 'name', {
          type: Sequelize.STRING,
          allowNull: false
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
