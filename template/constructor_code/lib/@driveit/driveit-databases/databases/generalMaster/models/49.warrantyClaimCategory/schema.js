const Sequelize = require("sequelize");
const errorDef = require('../../../../utils/error.codes');
const StatusEnum = require('../enums/Status');
module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: {
                    args: [1, 20],
                    msg: "Code length is not in this range"
                }
            }
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 100],
                    msg: "Name length is not in this range"
                }
            }
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status]
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
            type: Sequelize.BOOLEAN
        }

    }
}