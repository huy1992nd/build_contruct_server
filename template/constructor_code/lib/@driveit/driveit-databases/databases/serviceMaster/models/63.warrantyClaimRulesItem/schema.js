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
        effectiveDateFrom: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        effectiveDateTo: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        totalLabourRequireApproval: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: true
        },
        totalPartsRequireApproval: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: true
        },
        totalAmountRequireApproval: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: true
        },
        periodExceededRequireApproval: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: true
        },
        totalLabourStraightRejection: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: true
        },
        totalPartsStraightRejection: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: true
        },
        totalAmountStraightRejection: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: true
        },
        periodExceededStraightRejection: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
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
                    if(deleted){
                        return next();
                    }

                    const Function = require('.')
                    let self = this;
                    return Function.getOne({id: self.id}).then((record)=> {
                        if(!record) return next();
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