const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

const Branch = require('../18.branch');
module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        routeName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 100],
                    msg: "Name length is not in this range"
                }
            }
        },
        duration: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        estimatedKMs: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ACTIVE,
            values: [StatusEnum.ACTIVE],
        },
        remarks: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        branchId: {
            type: Sequelize.UUID,
            references: {
                model: "branch",
                key: "id",
            }
        }
    };
}