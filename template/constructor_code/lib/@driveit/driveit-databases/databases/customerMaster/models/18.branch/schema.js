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
        countryId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        companyRegistrationNo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
        },
        address1: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address2: {
            type: Sequelize.STRING,
            allowNull: true
        },
        address3: {
            type: Sequelize.STRING,
            allowNull: true
        },
        postcodeId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cityId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        stateId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        currencyId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true
        },
        telephone: {
            type: Sequelize.STRING,
            allowNull: true
        },
        fax: {
            type: Sequelize.STRING,
            allowNull: true
        },
        zone: {
            type: Sequelize.STRING,
            allowNull: true
        },
        area: {
            type: Sequelize.STRING,
            allowNull: true
        },
        regionId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        regionName: {
            type: Sequelize.STRING
        },
        taxId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        taxRegistrationDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        taxZone: {
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
        },

        // business type tab
        businessTypeIds: {
            type: Sequelize.STRING,
            allowNull: true
        },
        makeIds: {
            type: Sequelize.STRING,
            allowNull: true
        },
        costCenterId: {
            type: Sequelize.STRING(40),
            allowNull: true
        },
        profitCenterId: {
            type: Sequelize.STRING(40),
            allowNull: true
        },
        charOfAccount: {
            type: Sequelize.STRING,
            allowNull: true
        },
        eChecklist: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        eDisposal: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },

        telCode: {
            type: Sequelize.STRING,
            allowNull: true
            },
        
        faxCode: {
            type: Sequelize.STRING,
            allowNull: true
            },
    };
}