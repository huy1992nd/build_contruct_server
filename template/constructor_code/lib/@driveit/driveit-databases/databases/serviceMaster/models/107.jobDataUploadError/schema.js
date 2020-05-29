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

        jobDataUploadId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        sheetName: {
           type: Sequelize.STRING,
           allowNull:false
        },
        errorCell:{
          type: Sequelize.STRING,
          allowNull: false
        },
        validationMessage: {
            type: Sequelize.STRING,
            allowNull: false,
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