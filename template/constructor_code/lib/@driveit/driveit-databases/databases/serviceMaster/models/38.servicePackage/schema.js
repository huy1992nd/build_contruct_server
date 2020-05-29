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

                    const Function = require('.')
                    let self = this;
                    return Function.getAll({
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
                },
            }
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        companyId: {
            type: Sequelize.STRING,
        },
        branchId: {
            type: Sequelize.STRING,
        },
        makeId: {
            type: Sequelize.STRING,
        },
        businessStreamId: {
            type: Sequelize.STRING,
        },
        packageTypeId: {
            type: Sequelize.STRING,
        },
        externalKey: {
            type: Sequelize.STRING,
        },
        mileageFrom: {
            type: Sequelize.STRING,
        },
        milage: {
            type: Sequelize.STRING,
        },
        milageTolerance: {
            type: Sequelize.STRING,
        },
        mileageTo: {
            type: Sequelize.STRING,
        },
        validFrom: {
            type: Sequelize.DATE,
        },
        validTo: {
            type: Sequelize.DATE,
        },
        currencyId: {
            type: Sequelize.STRING,
        },
        changable: {
            type: Sequelize.ENUM,
            values: [StatusEnum.status],
        },
        expressService: {
            type: Sequelize.ENUM,
            values: [StatusEnum.status],
        },
        priceBy: {
            type: Sequelize.INTEGER,
        },
        totalLabour: {
            type: Sequelize.INTEGER,
        },
        totalParts: {
            type: Sequelize.INTEGER,
        },
        totalSublet: {
            type: Sequelize.INTEGER,
        },
        serviceTax: {
            type: Sequelize.INTEGER,
        },
        netPrice: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.NEW,
            values: [StatusEnum.packageStatus],
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
                NOT_UNIQUE: function (deleted, next) {
                    if (deleted) {
                        return next();
                    }

                    const Function = require('.')
                    let self = this;
                    return Function.getOne({ id: self.id }).then((record) => {
                        if (!record) return next();
                        //get all code
                        return Function.getAll({
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