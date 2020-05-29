const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        echeckListId: {
            type: Sequelize.UUID,
            allowNull: false,
            // unique: true, // to allow update based on status 'deleted'
        },
        inspectionId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        prcItemId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        prcItemName: {
            type: Sequelize.STRING,
        },
        inputType: {
            type: Sequelize.STRING,
        },
        valdecimal: {
            type: Sequelize.DECIMAL(15,2),
        },
        valtext: {
            type: Sequelize.STRING,
        },
        valdate: {
            type: Sequelize.DATE,
        },
        fileId: {
            type: Sequelize.UUID,
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