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

                    const Company = require('.')
                    let self = this;
                    return Company.getOne({
                        id: self.id
                    }).then((record) => {
                        if (!record) return next();
                        //get all code
                        return Company.getAll({
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

        languageId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        timezoneId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        postcodeId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        countryId: {
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
            type: Sequelize.STRING,
            allowNull: false
        },

        address1: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        address2: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        address3: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        email: {
            type: Sequelize.STRING,
            defaultValue: ''
        },

        faxCode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        telCode: {
            type: Sequelize.STRING,
            allowNull: true
        },

        telephone: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        fax: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        zone: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        callCenterNo: {
            type: Sequelize.STRING,
        },
        callCenterName: {
            type: Sequelize.STRING,
        },
        area: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        regionId: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        taxId: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        taxRegistrationDate: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        taxZone: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        taxClassification: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        companyRegistrationNo: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        dealerGroupId: {
            type: Sequelize.UUID,
            allowNull: true
        },

        makeIds: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        branchIds: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        website: {
            type: Sequelize.STRING,
            allownull: true
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