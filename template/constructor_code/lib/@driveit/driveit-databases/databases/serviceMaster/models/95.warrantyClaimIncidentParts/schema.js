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
        jobsId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        servicePackageId: {
            type: Sequelize.UUID,
            allowNull: true
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
        warrantyClaimIncidentId: {
            type: Sequelize.UUID,
            allowNull: true,
            defaultValue: '00000000-0000-0000-0000-000000000000'
        },
        jobCodeName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        partName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        partGroupName: {
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
        uomCode: {
            type: Sequelize.STRING
        },
        uomName: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.STRING
        },
        chargeType: {
            type: Sequelize.STRING
        },
        currencyId: {
            type: Sequelize.STRING
        },
        resolvedStatus: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: true,
            defaultValue: StatusEnum.NEW,
            values: [StatusEnum.roStatus],
        },
        inactivateReason: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
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