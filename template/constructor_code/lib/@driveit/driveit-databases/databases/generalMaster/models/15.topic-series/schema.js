const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');
const Utils = require('../../../../utils/database.utils');
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

                    const Model = require('.')
                    let self = this;
                    return Model.getAll({
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
                len: {
                    args: [1, 20],
                    msg: "Code length is not in this range"
                }
            }
        },
        prefix: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        startNumber: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                INVALID_PARAMETER: function (code, next) {

                    let self = this;

                    if (self.currentNumber && Number(self.currentNumber) < Number(self.startNumber)) {
                        return next(errorDef.INVALID_PARAMETER.message);
                    }

                    if (Number(self.startNumber) >= Number(self.endNumber)) {
                        return next(errorDef.INVALID_PARAMETER.message);
                    }

                    return next();
                }
            }
        },
        endNumber: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        currentNumber: { //this cannot be bigger than endNumber
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                END_NUMBER_EXCEEDED: function (code, next) {

                    const Model = require('.')
                    let self = this;
                    const where = {
                        id: self.id
                    };
                    return Model.getOne(where)
                        .then(function (record) {
                            if (!record) return next();

                            record.currentNumber = self.currentNumber ? self.currentNumber : (record.currentNumber ? record.currentNumber : record.startNumber);
                            if (Number(record.currentNumber) > Number(record.endNumber)) {
                                return next(errorDef.END_NUMBER_EXCEEDED.message);
                            }
                            return next();
                        })
                        .catch(function (err) {
                            return next(err);
                        });


                }
            }
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                NOT_UNIQUE: function (deleted, next) {
                    if (deleted) {
                        return next();
                    }

                    const Model = require('.')
                    let self = this;
                    return Model.getOne({
                        id: self.id
                    }).then((record) => {
                        if (!record) return next();
                        //get all code
                        return Model.getAll({
                                code: record.code
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
                    })

                }
            }
        },
        inactivateReason: {
            type: Sequelize.STRING,
            // allowNull: false
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