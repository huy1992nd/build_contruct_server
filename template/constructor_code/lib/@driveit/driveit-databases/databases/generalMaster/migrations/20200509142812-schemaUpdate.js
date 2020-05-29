'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('navisionServiceInvoiceHistory', 'customerCode', {
        type: Sequelize.STRING(20),
        defaultValue: '',
        allowNull: false,
      }),
      queryInterface.changeColumn('navisionServiceInvoiceHistory', 'description', {
        type: Sequelize.STRING(50),
        defaultValue: '',
        allowNull: false,
      }),
      queryInterface.changeColumn('navisionServiceInvoiceHistory', 'amount', {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.00,
        allowNull: false,
      }),
      
      queryInterface.changeColumn('navisionServiceInvoiceHistory', 'chassisNo', {
        type: Sequelize.STRING(20),
        defaultValue: '',
        allowNull: false
      }),
      queryInterface.changeColumn('navisionServiceInvoiceHistory', 'registrationNo', {
        type: Sequelize.STRING(20),
        defaultValue: '',
        allowNull: false
      }),
      queryInterface.changeColumn('navisionServiceInvoiceHistory', 'userFieldText1', {
        type: Sequelize.STRING(50),
        defaultValue: '',
        allowNull: false
      }),
      queryInterface.changeColumn('navisionServiceInvoiceHistory', 'makeCode', {
        type: Sequelize.STRING(20),
        defaultValue: '',
        allowNull: false
      }),

      queryInterface.changeColumn('navisionServiceInvoiceHistory', 'customerName', {
        type: Sequelize.STRING(50),
        defaultValue: '',
        allowNull: false
      }),

      queryInterface.changeColumn('navisionServiceInvoiceHistory', 'gstBusPostingGroup', {
        type: Sequelize.STRING(10),
        defaultValue: 'FUL',
      }),
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
