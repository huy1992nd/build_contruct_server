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
        makeId: {
            type: Sequelize.STRING
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        materialId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: { model: 'materialMasterBasicinfo', key: 'id' },
        }
    }
}