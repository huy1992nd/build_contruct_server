const Sequelize = require("sequelize");
const StatusEnum = require('../enums/OrderListStatus');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        orderListRefId:{
            type:Sequelize.STRING,
            // allowNull:false
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false
        },
        orderCreateDateFrom:{
            type:Sequelize.DATEONLY,
            allowNull:false
        },
        orderCreateDateTo:{
            type:Sequelize.DATEONLY,
            allowNull:false
        },
        orderType:{
            type:Sequelize.STRING,
            // allowNull:false
        },
        orderDate:{
            type:Sequelize.DATE,
            allowNull:false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        },

        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.NEW,
            values: [StatusEnum.status],
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
    };
}