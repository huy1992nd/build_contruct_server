'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all( [
    queryInterface.changeColumn(
      'branch',
      'name',
      {
        type: Sequelize.STRING,
        allowNull: false,
      }
     ),
    ] ).catch(error => {
      console.log(error);
      

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
