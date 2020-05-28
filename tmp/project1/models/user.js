"use strict";
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    "id": {
      "type": DataTypes.BIGINT,
      "allowNull": false,
      "primaryKey": true,
      "autoIncrement": true
    },
    "age": {
      "type": DataTypes.INTEGER
    },
    "name": {
      "type": DataTypes.STRING(30)
    },
    "roomId": {
      "type": DataTypes.INTEGER
    },
    "creator": {
      "type": DataTypes.STRING(30)
    },
    "createdAt": {
      "type": DataTypes.DATE,
      "defaultValue": sequelize.literal('NOW()')
    },
    "updatedAt": {
      "type": DataTypes.DATE,
      "defaultValue": sequelize.literal('NOW()')
    },
    "deleted": {
      "type": DataTypes.BOOLEAN,
      "allowNull": true,
      "defaultValue": false
    }
  });
  User.associate = (models) => {
    User.belongsTo(models.Room, {
      foreignKey: 'roomId'
    })
  }
  return User;
};