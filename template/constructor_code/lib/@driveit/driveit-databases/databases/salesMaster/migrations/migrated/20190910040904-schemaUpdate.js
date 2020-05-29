'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('vehicleBooking', 'louOfUndertaking', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('vehicleBooking', 'louDate', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('vehicleBooking', 'warrantyProfileId', {
        type: Sequelize.UUID,
        references: {
          model: 'warrantyProfile',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
      // Vehicle Booking hasMany Warranty Profile
      // queryInterface.changeColumn('warrantyProfile', 'id', {
      //   type: Sequelize.UUID,
      //   primaryKey: true,
      //   defaultValue: Sequelize.UUIDV1,
      //   references: {
      //     model: 'vehicleBooking',
      //     key: 'warrantyProfileId',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL'
      // })
    ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      
    ])
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
