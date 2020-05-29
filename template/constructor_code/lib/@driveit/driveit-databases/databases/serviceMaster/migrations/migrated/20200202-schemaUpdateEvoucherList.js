'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('eVoucherList', 'effectiveStartDate', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('eVoucherList', 'effectiveEndDate', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('eVoucherList', 'maxMilage', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('eVoucherList', 'minMilage', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('eVoucherList', 'maxSpendingAmount', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('eVoucherList', 'minSpendingAmount', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('eVoucherList', 'validityPerioid', {
        type: Sequelize.STRING,
      }),
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
