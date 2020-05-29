const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');


const ContractorDetailesEnum = {
    RECTIFIED: 'rectified',
    PASSED: "passed",

}

const ContractorDetailes = [
    ContractorDetailesEnum.RECTIFIED,
    ContractorDetailesEnum.PASSED,
]

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false,

        },
        startDateTime: {
            type: Sequelize.STRING,
            allowNull: false,

        },
        endDateTime: {
            type: Sequelize.STRING,
            allowNull: false,

        },
        startTime: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        endTime: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            validate: {
                max: 100
            },
            // allowNull: false,
        },

        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: "rectified",
            values: ContractorDetailes
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
        vehicleId: {
            type: Sequelize.UUID,
            references: {
                model: "vehicle", 
                key: "id", 
            }
        },
        // oicRectificationId: {
        //     type: Sequelize.STRING,
        //     references: {
        //         model: "oicRectification", 
        //         key: "id", 
        //     }
        // },
    };
}