"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("leadCustomer", "opCode", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn("leadCustomer", "hTelCode", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      // queryInterface.addColumn("leadCustomer", "oTelCode", {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // }),

      // queryInterface.addColumn("leadCustomer", "faxCode", {
      //   type: Sequelize.STRING,
      //   allowNull: true,
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
