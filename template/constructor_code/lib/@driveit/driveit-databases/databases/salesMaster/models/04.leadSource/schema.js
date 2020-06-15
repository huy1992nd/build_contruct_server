/*jshint esversion: 9 */
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
                NOT_UNIQUE: function(code, next) {

                    const Function = require('.')
                    let self = this;
                    return Function.getAll({
                            code
                        })
                        .then(function(record) {
                            record.forEach((record) => {
                                if (record && !record.deleted && self.id != record.id) {
                                    return next(errorDef.NOT_UNIQUE.message);
                                }
                            });
                            return next();
                        })
                        .catch(function(err) {
                            return next(err);
                        });
                },
                len: {
                    args: [1, 20],
                    msg: "Code length is not in this range"
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
            allowNull: true
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                NOT_UNIQUE: function(deleted, next) {
                    if (deleted) {
                        return next();
                    }

                    const Function = require('.');
                    let self = this;
                    return Function.getOne({
                        id: self.id
                    }).then((record) => {
                        if (!record) return next();
                        //get all code
                        return Function.getAll({
                                code: record.code
                            })
                            .then(function(record) {
                                record.forEach((record) => {
                                    if (record && !record.deleted && self.id != record.id) {
                                        return next(errorDef.NOT_UNIQUE.message);
                                    }
                                });
                                return next();
                            })
                            .catch(function(err) {
                                return next(err);
                            });
                    });

                }
            }
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
};