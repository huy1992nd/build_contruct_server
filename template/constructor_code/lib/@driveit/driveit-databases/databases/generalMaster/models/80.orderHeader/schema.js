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
        countryCode: {
            type: Sequelize.STRING(3),
            allowNull: false
        },
        orderNo: {
            type: Sequelize.STRING(21),
            allowNull: false
        },
        orderType: {
            type: Sequelize.STRING,
            allowNull: false
        },
        documentDate: {
            type: Sequelize.DATEONLY,
            allowNull: true,
        },
        company: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        branch: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        advisorId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        orderStatus: {
            type: Sequelize.STRING,
            allowNull: false
        },
        chassisNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        regNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        regDate: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        mileage: {
            type: Sequelize.STRING,
            allowNull: true
        },
        make: {
            type: Sequelize.STRING,
            allowNull: true
        },
        modelVariant: {
            type: Sequelize.STRING,
            allowNull: true
        },
        svcModel: {
            type: Sequelize.STRING,
            allowNull: true
        },
        engineType: {
            type: Sequelize.STRING,
            allowNull: true
        },
        bodyType: {
            type: Sequelize.STRING,
            allowNull: true
        },
        customerID: {
            type: Sequelize.STRING,
            allowNull: false
        },
        custKey: {
            type: Sequelize.STRING(15),
            allowNull: true
        },
        mainAdd: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        corrAdd: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        corrAddKeySeq: {
            type: Sequelize.STRING,
            allowNull: true
        },
        contPers: {
            type: Sequelize.STRING,
            allowNull: true
        },
        contPersKeySeq: {
            type: Sequelize.STRING,
            allowNull: true
        },
        currency: {
            type: Sequelize.STRING(3),
            allowNull: true
        },
        custAcctGrp: {
            type: Sequelize.STRING,
            allowNull: true
        },
        custGroup: {
            type: Sequelize.STRING(3),
            allowNull: true
        },
        payTerms: {
            type: Sequelize.STRING(10),
            allowNull: true
        },
        taxClassCust: {
            type: Sequelize.STRING(5),
            allowNull: true
        },
        pricingDateTime: {
            type: Sequelize.DATE,
            allowNull: true
        },
        businessType: {
            type: Sequelize.STRING,
            allowNull: true
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
        inactivateReason: {
            type: Sequelize.STRING,
            allowNull: true
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: true
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: true
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    };
}