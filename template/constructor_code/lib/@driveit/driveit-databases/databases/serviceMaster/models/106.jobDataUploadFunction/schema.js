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
        // type: {
        //     type: Sequelize.ENUM,
        //     allowNull: false,
        //     values: [StatusEnum.typeJobUploadFunction]
        // },
        uploadFunction: {
           type: Sequelize.STRING,
           allowNull:false
        },
        templateURL:{
          type: Sequelize.STRING,
          allowNull: false
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
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