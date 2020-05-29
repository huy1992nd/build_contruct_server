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
        symptomCode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        remarks: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cBj: {
            type: Sequelize.STRING,
            allowNull: false
        },
        jobName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        jobId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        vehicleRegNo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        currentMileage: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM("enabled", "disabled", "pending"),
            allowNull: false,
            field: 'status',
            defaultValue: 'enabled'
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            field: 'createdAt'
        },
        updateBy: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'updateBy'
        },
        updateAt: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            field: 'updateAt'
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'createdBy'
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

                    const dataModel = require('.')
                    let self = this;
                    return dataModel.getOne({ id: self.id }).then((record) => {
                        if (!record) return next();
                        //get all type
                        return dataModel.getAll({
                            type: record.type
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
        }
    };
}