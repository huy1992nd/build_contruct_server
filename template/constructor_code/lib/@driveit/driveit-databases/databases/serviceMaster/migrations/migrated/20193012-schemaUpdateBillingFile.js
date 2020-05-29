'use strict';
module.exports = {
 up: (queryInterface, Sequelize) => {
   return Promise.all([
     queryInterface.addColumn('billing', 'totalLabourDiscount', {
       type: Sequelize.STRING,
       allowNull:true
     }),
     queryInterface.addColumn('billing', 'totalPartsDiscount', {
      type: Sequelize.STRING,
      allowNull:true
    }),
    queryInterface.addColumn('billing', 'depositAmountExcludingTax', {
      type: Sequelize.STRING,
      allowNull:true
    }),
    queryInterface.addColumn('billing', 'excessClause', {
      type: Sequelize.STRING,
      allowNull:true
    }),
    queryInterface.addColumn('billing', 'underInsured', {
      type: Sequelize.STRING,
      allowNull:true
    }),
    queryInterface.addColumn('billing', 'betterment', {
      type: Sequelize.STRING,
      allowNull:true
    }),
    queryInterface.addColumn('billing', 'customerPayableTax', {
      type: Sequelize.STRING,
      allowNull:true
    }),
    queryInterface.addColumn('billing', 'centRoundAdjustment', {
      type: Sequelize.STRING,
      allowNull:true
    }),
    queryInterface.addColumn('billing', 'paymentId', {
      type: Sequelize.STRING,
      allowNull:true
    }),
    queryInterface.addColumn('repairOrderInvoice', 'billingId', {
      type: Sequelize.STRING,
      allowNull:true
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