const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        code :{
            type: Sequelize.STRING,
            allowNull: false
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        bookingEffectiveStartDate: {
            type: Sequelize.DATE
        },
        bookingEffectiveEndDate: {
            type: Sequelize.DATE
        },
        registrationEffectiveStartDate: {
            type: Sequelize.DATE
        },
        registrationEffectiveEndDate: {
            type: Sequelize.DATE
        },
        productIds: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        packageIds: {
            type: Sequelize.TEXT,
            allowNull: false
        },

        makeId: {
            type: Sequelize.UUID,
            references: {
                model: "make", 
                key: "id", 
            }
        },
        modelId: {
            type: Sequelize.UUID,
            references: {
                model: "model", 
                key: "id", 
            }
        },

        tenantId :{
            type: Sequelize.UUID,
            allowNull: true
        },
        companyId :{
            type: Sequelize.UUID,
            allowNull: true
        },
        branchId :{
            type: Sequelize.UUID,
            allowNull: true
        },

        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: StatusEnum.status
        },
        inactivateReason: {
            type: Sequelize.STRING,
            allowNull: true
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