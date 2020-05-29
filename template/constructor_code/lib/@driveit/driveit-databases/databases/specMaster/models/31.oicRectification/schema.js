const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');


const OICRectificationEnum={
    NEW:'new',
    RECTIFIED:'rectified',
    PASSED:"passed",
    COMPLETED:"completed"
}


const OICRectification = [ 
    OICRectificationEnum.NEW,
    OICRectificationEnum.RECTIFIED,
    OICRectificationEnum.PASSED,
    OICRectificationEnum.COMPLETED
]

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        code :{
            type: Sequelize.STRING,
            allowNull: false,

        },
        serviceStartDate:{
            type: Sequelize.STRING,
            allowNull: false,

        },
        serviceEndDate:{
            type: Sequelize.STRING,
            allowNull: false,

        },
        referenceDate:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        vehicleStockId: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        vehicleLocationId: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        storageLocationId: {
            type: Sequelize.STRING,
            // allowNull: false,
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
            defaultValue: "new",
            values: OICRectification
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
        }
    };
}