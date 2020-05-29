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
        uploadFuntionType: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: [StatusEnum.typeVehicleUploadFunction]
        },
        uploadFunctionName: {
           type: Sequelize.STRING,
           allowNull:false
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: [StatusEnum.uploadStatus]
        },
        fileName: {
           type: Sequelize.STRING,
           allowNull:false
        },
        fileURL:{
          type: Sequelize.STRING,
          allowNull: false
        },
        fileStatusErrors:{
            type: Sequelize.TEXT,
            allowNull: false
        },
        uploadedById:{
            type: Sequelize.STRING,
            allowNull: false
        },
        uploadStartTime:{
            type: Sequelize.DATE,
            allowNull: false
        },
        uploadEndTime:{
            type: Sequelize.DATE,
            allowNull: false
        },
        idNo: {
            type: Sequelize.STRING,
            allowNull: true
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