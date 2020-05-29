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
        materialId:{
            type: Sequelize.STRING
        },
        materialDescription:{
            type: Sequelize.STRING
        },
        superSessionValidityStartDate:{
            type: Sequelize.DATE,
        },
        superSessionValidityEndDate:{
            type: Sequelize.DATE,
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        }  
    }
}