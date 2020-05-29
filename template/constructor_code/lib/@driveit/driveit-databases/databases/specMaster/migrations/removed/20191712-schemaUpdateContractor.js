'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      
      queryInterface.addColumn('contractorDetailes', 'startTime', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('contractorDetailes', 'endTime', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      
    ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      
    ])
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
