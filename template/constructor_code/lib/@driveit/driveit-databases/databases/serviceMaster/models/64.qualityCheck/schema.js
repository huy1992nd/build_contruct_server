const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        foremanName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        foremanId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        outTime: {
            type: Sequelize.STRING,
        },
        inTime: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        routeId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        routeName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        qcResult: {
            type: Sequelize.STRING,
            allowNull: false
        },
        referToNsd: {
            type: Sequelize.STRING,
            allowNull: true
        },
        remark: {
            type: Sequelize.STRING,
            allowNull: true
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        repairOrderId: {
            type: Sequelize.UUID,
            references: {
               model: "repairOrder", 
               key: "id", 
            }
         }
    };
}