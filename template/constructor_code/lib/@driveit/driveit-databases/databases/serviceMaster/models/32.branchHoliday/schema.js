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
        branchId: {
            type: Sequelize.STRING,
            allowNull:false
        },
        date: {
            type: Sequelize.DATE,
            allowNull:false
        },
        holidayName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        workingDay: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        reason:{
          type: Sequelize.STRING,
          allowNull: true
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
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
                        //get all code
                        return dataModel.getAll({
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
        }
    };
}