'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.changeColumn('vehicleTransfer', 'id', {
      //   type: Sequelize.CHAR(36),
      //   allowNull: false
      // }),

      // queryInterface.changeColumn('vehicleTransferOptionalPackageItem', 'vehicleTransferId', {
      //   type: Sequelize.CHAR(36),
      //   allowNull: false
      // }),
      // queryInterface.changeColumn('vehicleTransferOptionalPackageItem', 'id', {
      //   type: Sequelize.CHAR(36),
      //   allowNull: false
      // }),

      // queryInterface.changeColumn('vehicleTransferCompulsoryPackageItem', 'vehicleTransferId', {
      //   type: Sequelize.CHAR(36),
      //   allowNull: false
      // }),
      // queryInterface.changeColumn('vehicleTransferCompulsoryPackageItem', 'id', {
      //   type: Sequelize.CHAR(36),
      //   allowNull: false
      // }),
      
      // queryInterface.changeColumn('vehicleTransferOptionalItem', 'id', {
      //   type: Sequelize.CHAR(36),
      //   allowNull: false
      // }),
      // queryInterface.changeColumn('vehicleTransferOptionalItem', 'vehicleTransferId', {
      //   type: Sequelize.CHAR(36),
      //   allowNull: false
      // }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
 queryInterface.changeColumn('vehicleTransfer', 'designatedStorageLocationId', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      Example:
      return queryInterface.dropTable('users');
    */
  }
};
