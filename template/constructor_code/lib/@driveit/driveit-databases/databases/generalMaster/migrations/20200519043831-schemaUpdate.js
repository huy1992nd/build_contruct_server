'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.changeColumn('navisionJVSHistory', 'id', {
      //   type: Sequelize.UUID,
      //   allowNull: false,
      // }),
      // queryInterface.changeColumn('navisionJVSHistory', 'seqNo', {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      // }),
      // queryInterface.addColumn('navisionJVSHistory', 'recordId', {
      //   type: Sequelize.UUID,
      //   allowNull: false,
      //   primaryKey: true,
      //   defaultValue: Sequelize.UUIDV1,
      // }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
