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
        orderNo: {
            type: Sequelize.STRING,
            allowNull: true,
            /*validate: {
                NOT_UNIQUE: function (orderNo, next) {
 
                    const Education = require('.')
                    let self = this;
                    return Education.getAll({
                        orderNo
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
                    msg: "Order No length is not in this range"
                },
            }*/
        },
        partId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        partCode: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 100],
                    msg: "Name length is not in this range"
               },
            }
        },
        partName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        quantity: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        uom: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        vendorId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        vendorCode: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        vendorName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        contractorId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        contractorCode: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        contractorName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        itemCategory: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        installDate: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        installType: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        branchId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        branchCode: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        branchName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
        },
        inactivateReason: {
            type: Sequelize.STRING,
            // allowNull: false
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

                    const Education = require('.')
                    let self = this;
                    return Education.getOne({id: self.id}).then((record)=> {
                        if(!record) return next();
                        //get all order no
                        return Education.getAll({
                            orderNo: record.orderNo
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