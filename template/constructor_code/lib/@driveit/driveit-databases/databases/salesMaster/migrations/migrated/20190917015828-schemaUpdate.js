'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  return Promise.all([ 
    queryInterface.addColumn(
      'orderList', 'adhocOrderId',
      {
        type: Sequelize.UUID,
        references: {
          model: 'adhocOrder',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'SET NULL'
      }
    ),
    queryInterface.addColumn(
      'orderList', 'adhocOrderSetupId',
      {
        type: Sequelize.UUID,
        references: {
          model: 'adhocOrderSetup',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'SET NULL'
      }
    ),
    queryInterface.addColumn(
      'orderListSetup', 'adhocOrderSetupColorId',
      {
        type: Sequelize.UUID,
        references: {
          model: 'adhocOrderSetupColor',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'SET NULL'
      }
    ),
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
