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
        workshopStocks: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        billTo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        discountAmount: {
            type: Sequelize.DECIMAL(15, 6),
            allowNull: true
        },
        discountPercent: {
            type: Sequelize.DECIMAL(15, 6),
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
        unitAmount: {
            type: Sequelize.STRING,
            allowNull: true
        },
        materialMasterId: {
            type: Sequelize.STRING
        },
        materialId: {
            type: Sequelize.STRING
        },
        uomId: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.STRING
        },
        billToName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        chargeType: {
            type: Sequelize.STRING
        },
        currencyId: {
            type: Sequelize.STRING
        },
        resolvedStatus: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        warrantyIncidentId: {
            type: Sequelize.STRING
        },
        //PPM======
        fulfilledMeterialID: {
            type: Sequelize.STRING,
            allowNull: true
        },
        fulfilledQty: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        returnedQty: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        returnAcceptedQty: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        TotalCost: {
            type: Sequelize.DECIMAL(13, 2),
            allowNull: true
        },
        UnitCost: {
            type: Sequelize.DECIMAL(13, 2),
            allowNull: true
        },
        partStatus: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.NEW,
            values: [StatusEnum.partStatus.sort()],
        },
        //PPM-------
        costCenterId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        costCenterName: {
            type: Sequelize.STRING,
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
        }
    };
}