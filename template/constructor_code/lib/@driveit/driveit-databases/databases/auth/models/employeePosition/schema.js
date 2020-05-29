const Sequelize = require("sequelize");
const Enums = require('../enums');
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

                    const Index = require('.')
                    let self = this;
                    return Index.getAll({
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
                }
            }
        },
        countryId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                max: {
                    args: [20],
                    msg: "Maximum 20 characters allowed in description"
                },
            }
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: Enums.ENABLED,
            values: [Enums.status],
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

                    const Index = require('.')
                    let self = this;
                    return Index.getOne({
                        id: self.id
                    }).then((record) => {
                        if (!record) return next();
                        //get all code
                        return Index.getAll({
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