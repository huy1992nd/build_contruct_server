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
        releaseDateTime: {
            type: Sequelize.DATE,
            allowNull: true
        },
        arrivalDateTime: {
            type: Sequelize.DATE,
            allowNull: true
        },
        estCompleteTime: {
            type: Sequelize.TIME,
            allowNull: true
        },
        waiting: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        nonWaiting: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        vehiCollectionSMS: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        carWash: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        customerType: {
            type: Sequelize.STRING(10),
            allowNull: true
        },
        appointmentID: {
            type: Sequelize.STRING,
            allowNull: true
        },
        bookingDate: {
            type: Sequelize.DATEONLY,
            allowNull: true,
        },
        bookingType: {
            type: Sequelize.STRING(10),
            allowNull: true
        },
        buyersOrderNo: {
            type: Sequelize.STRING(10),
            allowNull: true
        },

        buyersOrderDate: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },

        exciseExempted: {
            type: Sequelize.STRING,
            allowNull: true
        },
        salesTaxExempted: {
            type: Sequelize.STRING,
            allowNull: true
        },
        dropPoint: {
            type: Sequelize.STRING(10),
            allowNull: true
        },
        registerRegion: {
            type: Sequelize.STRING(3),
            allowNull: true
        },
        yearMade: {
            type: Sequelize.STRING(4),
            allowNull: true
        },
        leadID: {
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