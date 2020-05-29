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
        employeeId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        companyId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        branchId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        remark: {
            type: Sequelize.STRING,
          //  allowNull: false
        },
        dateFrom: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        dateTo: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        numberOfDays: {
            type: Sequelize.INTEGER,
            // allowNull: false
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
                    if(deleted){
                        return next();
                    }

                    const dataModel = require('.')
                    let self = this;
                    return dataModel.getOne({id: self.id}).then((record)=> {
                        if(!record) return next();
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