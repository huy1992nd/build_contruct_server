const Sequelize = require("sequelize");
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        
        orderNo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        orderDate: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        orderType: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        registrationNo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        mileage: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        
        companyId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        branchId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        internalUserId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        customerId: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        status: {
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
        },
        vehicleId: {
            type: Sequelize.UUID,
            references: {
                model: "vehicle", 
                key: "id", 
            }
        },
        nextRecommendedMileage: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        nextRecommendedDate: {
            type: Sequelize.DATEONLY,
            allowNull: true
        }
    };
}