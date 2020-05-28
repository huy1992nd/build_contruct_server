"use strict";
module.exports = function(sequelize, DataTypes) {
  var Room = sequelize.define("Room", {
    "id": {
      "type": DataTypes.BIGINT,
      "allowNull": false,
      "primaryKey": true,
      "autoIncrement": true
    },
    "name": {
      "type": DataTypes.STRING(30)
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
  Room.associate = (models) => {}
  return Room;
};