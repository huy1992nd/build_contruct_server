const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');
const RepairOrderParts = require('../12.repairOrderParts');
const RepairOrders = require('../07.repairOrder')
const MaterialMasterBasicInfo = require('../../../generalMaster/models/19.materialMaster');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        repairOrderId:{
            type: Sequelize.UUID,
            references: {
                model: RepairOrders,
                key: 'id'
            }
        },
        repairOrderPartId:{
            type: Sequelize.UUID,
            references: {
                model: RepairOrderParts,
                key: 'id'
            }
        },
        partId: {
            type: Sequelize.UUID,
            references: {
                model: MaterialMasterBasicInfo,
                key: 'id'
            }
        },
        unitAmount: {
            type: Sequelize.Sequelize.DECIMAL(15, 2),
        },
        amount: {
            type: Sequelize.Sequelize.DECIMAL(15, 2),
        },
        splitPercent: {
            type: Sequelize.Sequelize.DECIMAL(15, 2),
        },
        billTo: {
            type: Sequelize.STRING,
        },
        billToName: {
            type: Sequelize.STRING,
        },
        chargeType: {
            type: Sequelize.STRING
        },
        discountAmount: {
            type: Sequelize.DECIMAL(15, 2),
        },
        discountPercent: {
            type: Sequelize.DECIMAL(15, 2),
        },
        quantity: {
            type: Sequelize.STRING,
        },
        taxAmount: {
            type: Sequelize.DECIMAL(15, 2),
        },
        total: {
            type: Sequelize.DECIMAL(15, 2),
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
        },
        inactivateReason: {
            type: Sequelize.STRING,
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        }
    };
}