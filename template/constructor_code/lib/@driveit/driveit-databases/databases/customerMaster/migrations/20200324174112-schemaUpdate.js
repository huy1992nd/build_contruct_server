'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('dropPoint', 'dropCityId', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('dropPoint', 'dropPostCodeId', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('dropPoint', 'dropStateId', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('dropPoint', 'dropCountryId', {
        type: Sequelize.STRING,
        allowNull: true,
      }),

      queryInterface.addColumn('dropPoint', 'dropArea', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('dropPoint', 'dropZone', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('dropPoint', 'dropRegionId', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('dropPoint', 'dropTelephone', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('dropPoint', 'dropFax', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('dropPoint', 'dropPrimaryContact', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('dropPoint', 'dropRfidPoleNo', {
        type: Sequelize.STRING,
        allowNull: true,
      }),

      queryInterface.changeColumn('dropPoint', 'dropCity', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.changeColumn('dropPoint', 'dropPostCode', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.changeColumn('dropPoint', 'dropState', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.changeColumn('dropPoint', 'dropCountry', {
        type: Sequelize.STRING,
        allowNull: true,
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
