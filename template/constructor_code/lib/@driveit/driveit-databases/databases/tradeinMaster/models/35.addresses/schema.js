const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1,
            unique: true
        },
        address1: {
            type: Sequelize.STRING,
            allowNull: true
        },
        address2: {
            type: Sequelize.STRING,
            allowNull: true
        },
       address3: {
            type: Sequelize.STRING,
            allowNull: true
        },
        address4: {
            type: Sequelize.STRING,
            allowNull: true
        },
        city: {
            type: Sequelize.STRING,
            allowNull: true
        },
        postcode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        statecode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        statename: {
            type: Sequelize.STRING,
            allowNull: true
        },
        countrycode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        countryname: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
        },
        inactivateReason: {
            type: Sequelize.STRING,
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