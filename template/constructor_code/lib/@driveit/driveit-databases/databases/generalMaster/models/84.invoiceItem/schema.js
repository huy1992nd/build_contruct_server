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
        countryCode:{
            type:Sequelize.STRING(3),
            allowNull: false
        },
        billingDocument: {
            type:Sequelize.STRING(21),
            allowNull: false
        },

        itemNo:{
            type: Sequelize.STRING(21),
            allowNull:true
        },
        jobNo:{
            type: Sequelize.STRING(21),
            allowNull:true
        },
        jobClass:{
            type: Sequelize.STRING(21),
            allowNull:true
        },
        jobType:{
            type: Sequelize.STRING(21),
            allowNull:true
        },
        itemType:{
            type: Sequelize.STRING(20),
            allowNull:true
        },
        item:{
            type: Sequelize.STRING(20),
            allowNull:true
        },
        itemDescription:{
            type: Sequelize.STRING,
            allowNull:true
        },
        referMaterial:{
            type: Sequelize.STRING(15),
            allowNull:true
        },
        materialType:{
            type: Sequelize.STRING(5),
            allowNull:true
        },
        materialGroup:{
            type: Sequelize.STRING(3),
            allowNull:true
        },
        packageID:{
            type: Sequelize.STRING,
            allowNull:true
        },
        make:{
            type: Sequelize.STRING,
            allowNull:true
        },
        pricingDate:{
            type: Sequelize.DATE,
            allowNull:true
        },
        quantity:{
            type: Sequelize.INTEGER,
            allowNull:true
        },
        uom:{
            type: Sequelize.STRING,
            allowNull:true
        },
        unitCost:{
            type: Sequelize.STRING,
            allowNull:true
        },
        unitPrice:{
            type: Sequelize.FLOAT(10,2),
            allowNull:true
        },
        splitPercetage:{
            type: Sequelize.FLOAT(10,2),
            allowNull:true
        },
        netCost:{
            type: Sequelize.FLOAT(10,2),
            allowNull:true
        },
        netPrice1:{
            type: Sequelize.FLOAT(10,2),
            allowNull:true
        },
        discPercetage:{
            type: Sequelize.FLOAT(10,2),
            allowNull:true
        },
        discAmount:{
            type: Sequelize.FLOAT(10,2),
            allowNull:true
        },
        netPrice2:{
            type: Sequelize.FLOAT(10,2),
            allowNull:true
        },
        taxClassMat:{
            type: Sequelize.BOOLEAN,
            allowNull:true
        },
        taxAmount:{
            type: Sequelize.FLOAT(10,2),
            allowNull:true
        },
        taxCode:{
            type: Sequelize.STRING(2),
            allowNull:true
        },
        netPrice3:{
            type: Sequelize.FLOAT(10,2),
            allowNull:true
        },
        rounding:{
            type: Sequelize.FLOAT(10,2),
            allowNull:true
        },
        grossAmount:{
            type: Sequelize.FLOAT(10,2),
            allowNull:true
        },
        costCenter:{
            type: Sequelize.STRING,
            allowNull:true
        },
        profitCenter:{
            type: Sequelize.STRING,
            allowNull:true
        },
        GLCode:{
            type: Sequelize.STRING,
            allowNull:true
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        inactivateReason: {
            type: Sequelize.STRING,
            allowNull: true
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // createdAt: {
        //     type: Sequelize.DATE,
        //     allowNull: true,
        //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        //     field: 'createdAt'
        // },
        // updateAt: {
        //     type: Sequelize.DATE,
        //     allowNull: true,
        //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        //     field: 'updateAt'
        // }
    };
}