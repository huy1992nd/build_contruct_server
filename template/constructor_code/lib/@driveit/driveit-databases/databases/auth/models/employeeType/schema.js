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
        code: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                NOT_UNIQUE: function (code, next) {
                    const dataModel = require('.')
                    let self = this;
                    return dataModel.getAll({
                        code
                        })
                        .then(function (record) {
                            record.forEach((record) => {
                                if (record && !record.deleted && self.id != record.id) {
                                    return next(errorDef.NOT_UNIQUE.message);
                                }
                            })
                            return next();
                        })
                        .catch(function (err) {
                            return next(err);
                        });
                },
                max: {
                    args: [2],
                    msg: "Maximum 2 characters allowed in code"
                },
            }
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
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
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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