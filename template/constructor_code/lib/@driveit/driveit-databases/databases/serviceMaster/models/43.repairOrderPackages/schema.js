const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');
// `chargeTypeName: (2) ["External", undefined]
// partAmount: "asd"
// partChargeType: "4526d3e0-9d39-11e9-a805-353a6c7bbabf"
// partDiscountAmount: "asd"
// partDiscountPercent: "asdasdasd"
// partFlatRate: "0b06f7d0-9d3e-11e9-a805-353a6c7bbabf"
// partFlatRateName: (5) [undefined, "Periodical Maintenance", undefined, undefined, undefined]
// partGroup: "asd"
// partTaxAmount: "asdasd"
// partTotal: "asd"
// quantity: "asd"
// type: "parts"`
module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        chargeType:{
            type: Sequelize.STRING,
            allowNull: true
        },
        quantity:{
            type: Sequelize.INTEGER,
            allowNull: true
        },
        billTo:{
            type: Sequelize.STRING, 
            allowNull: true
        },
        billToName: {
            type: Sequelize.STRING,
             allowNull: true
        },
        taxAmount: {
            type: Sequelize.DECIMAL(15, 6),
            allowNull: true
        },
        totalAmount: {
            type: Sequelize.DECIMAL(15, 6),
            allowNull: true
        }, 
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.NEW,
            values: [StatusEnum.roStatus],
        },
        inactivateReason: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        discountAmount: {
            type: Sequelize.DECIMAL(15, 2)
        }
    };
}