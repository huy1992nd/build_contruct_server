
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
        
        // status: {
        //     type: Sequelize.ENUM,
        //     allowNull: false,
        //     defaultValue: StatusEnum.ENABLED,
        //     values: [StatusEnum.status]
        // },

        fileName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        fileUrl: {
            type: Sequelize.STRING,
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
        createdByName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // contractId: {
        //     type: Sequelize.UUID,
        //     references: {
        //        model: "contracts", 
        //        key: "id", 
        //     }
        // }
    };
}