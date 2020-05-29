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
        customerIdentityNo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        regNo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        customerName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phoneNo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        makeId:{
            type:Sequelize.STRING
        },
        modelId :{
            type:Sequelize.STRING
        },
        variantId:{
            type:Sequelize.STRING
        },
        email:{
            type:Sequelize.STRING
        },
        areaCode:{
            type:Sequelize.STRING
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
    }
}