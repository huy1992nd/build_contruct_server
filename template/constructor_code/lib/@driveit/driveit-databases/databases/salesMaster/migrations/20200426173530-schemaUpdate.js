'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    try {
      await queryInterface.addColumn("accessoriesItem", "packageTypeName", {
        type: Sequelize.STRING,
        allowNull: true,
      });
      await queryInterface.addColumn("accessoriesItem", "itemTypeName", {
        type: Sequelize.STRING,
        allowNull: true,
      });
    } catch(err) {
      throw (err);
    }
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
