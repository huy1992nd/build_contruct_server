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
        companyCode: {
            type: Sequelize.STRING,
            allowNull: true,
            // validate: {
            //     NOT_UNIQUE: function (code, next) {

            //         const Function = require('.')
            //         let self = this;
            //         return Function.getAll({
            //             companyCode
            //             })
            //             .then(function (record) {
            //                 record.forEach((record) => {
            //                     if (record && !record.deleted && self.id != record.id) {
            //                         return next(errorDef.NOT_UNIQUE.message);
            //                     }
            //                 })
            //                 return next();
            //             })
            //             .catch(function (err) {
            //                 return next(err);
            //             });
            //     },
            //     len: {
            //         args: [1, 20],
            //         msg: "Code length is not in this range"
            //     },
            // }
        },

        companyName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        approvalNumber: {
            type: Sequelize.STRING,
            allowNull: true
        },
        vehicleAccidentDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        approvalAmount: {
            type: Sequelize.DOUBLE(7, 2),
            allowNull: true
        },
        totalLabour: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        totalPart: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        tax: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        processingFees: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        towingCharges: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        totalAmount: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        payableAmount: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        underinsuredAmount: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        underinsuredAmountWaiver: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        bettermentAmount: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        bettermentAmountWaiver: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        accessAmount: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        accessAmountWaiver: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        customerPayableTax: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        introducerCode: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null
        },
        introducerId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        introducerName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        introducerContactNumber: {
            type: Sequelize.STRING,
            allowNull: true
        },
        introducerCommission: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: true,
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