'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('warrantyApprovalJobs', 'hours', { type: Sequelize.DECIMAL(15, 2) }),
      queryInterface.changeColumn('warrantyApprovalJobs', 'unitAmount', { type: Sequelize.DECIMAL(15, 2) }),
      queryInterface.changeColumn('warrantyApprovalJobs', 'amount', { type: Sequelize.DECIMAL(15, 2) }),
      queryInterface.changeColumn('warrantyApprovalJobs', 'discountPercent', { type: Sequelize.DECIMAL(15, 2) }),
      queryInterface.changeColumn('warrantyApprovalJobs', 'discountAmount', { type: Sequelize.DECIMAL(15, 2) }),
      queryInterface.changeColumn('warrantyApprovalJobs', 'taxAmount', { type: Sequelize.DECIMAL(15, 2) }),
      queryInterface.changeColumn('warrantyApprovalJobs', 'totalAmount', { type: Sequelize.DECIMAL(15, 2) }),

      queryInterface.addColumn('warrantyApprovalJobs', 'assignedSAId', { type: Sequelize.STRING(36) }),
      queryInterface.addColumn('warrantyApprovalJobs', 'assignedSAName', { type: Sequelize.STRING }),

      queryInterface.changeColumn('warrantyApprovalParts', 'unitAmount', { type: Sequelize.DECIMAL(15, 2) }),
      queryInterface.changeColumn('warrantyApprovalParts', 'amount', { type: Sequelize.DECIMAL(15, 2) }),
      queryInterface.changeColumn('warrantyApprovalParts', 'discountPercent', { type: Sequelize.DECIMAL(15, 2) }),
      queryInterface.changeColumn('warrantyApprovalParts', 'discountAmount', { type: Sequelize.DECIMAL(15, 2) }),
      queryInterface.changeColumn('warrantyApprovalParts', 'taxAmount', { type: Sequelize.DECIMAL(15, 2) }),
      queryInterface.changeColumn('warrantyApprovalParts', 'totalAmount', { type: Sequelize.DECIMAL(15, 2) }),

      queryInterface.changeColumn('warrantyApprovalIncident', 'totalLabour', { type: Sequelize.DECIMAL(15, 2) }),
      queryInterface.changeColumn('warrantyApprovalIncident', 'totalPart', { type: Sequelize.DECIMAL(15, 2) }),
      queryInterface.changeColumn('warrantyApprovalIncident', 'taxAmount', { type: Sequelize.DECIMAL(15, 2) }),
      queryInterface.changeColumn('warrantyApprovalIncident', 'totalAmount', { type: Sequelize.DECIMAL(15, 2) }),
      queryInterface.changeColumn('warrantyApprovalIncident', 'partsPurchaseInvoiceNo', { type: Sequelize.STRING(36) }),
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
