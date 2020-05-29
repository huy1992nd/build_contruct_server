const Sequelize = require("sequelize");
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        
        keyId: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        value: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        remark: {
            type: Sequelize.TEXT,
            allowNull: true,
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
        }
    };
}