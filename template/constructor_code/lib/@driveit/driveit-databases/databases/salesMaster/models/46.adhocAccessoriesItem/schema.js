const Sequelize = require("sequelize");
const PickListStatusEnum = require('../enums/PickListStatus');
const InstallationStatusEnum = require('../enums/InstallationStatus');
const errorDef = require('../../../../utils/error.codes');
module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        packageId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        itemId: { // material ID
            type: Sequelize.STRING,
            allowNull: false
        },
        packageTypeName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        itemTypeName: {
            type: Sequelize.STRING,
            allowNull: true
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