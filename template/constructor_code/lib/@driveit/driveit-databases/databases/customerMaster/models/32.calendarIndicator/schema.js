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
        colorName: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.GREEN,
            values: [StatusEnum.colors],
        },
        min: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        max: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        companyId: {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: "company",
                key: "id"
            }
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ACTIVE,
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
        },
    };
}