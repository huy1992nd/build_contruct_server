const Sequelize = require("sequelize");
const BookingStatusEnum = require('../enums/BookingStatus');
const errorDef = require('../../../../utils/error.codes');
module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
    
        vehicleBookingId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isTradeInVehicle: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        vehicleId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        echecklistId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        regNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        makeId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        modelId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        variantId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        colorId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        chassisNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        engineNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        transmissionTypeId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        yearMake: {
            type: Sequelize.STRING,
            allowNull: true
        },

        engineCapacity: {
            type: Sequelize.STRING,
            allowNull: true
        },
        jpjEngineTypeId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        jpjUsageTypeId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        jpjBodyTypeId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        registrationDate: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },

        contactRelationshipId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        customerId: {
            type: Sequelize.STRING,
            allowNull: true
        },

        financierId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        stateId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        branchId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        financierAddr: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        amount: {
            type: Sequelize.DOUBLE(7, 2),
            allowNull: true
        },
        settlementDueDate: {
            type: Sequelize.STRING,
            allowNull: true
        },

        isThirdPartyVehicle: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isHpEncumbrance: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
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