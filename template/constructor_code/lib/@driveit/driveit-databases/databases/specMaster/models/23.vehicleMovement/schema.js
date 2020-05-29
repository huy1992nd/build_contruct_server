const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID, // create from topic series
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        batchNo: {
            type: Sequelize.UUID,
            defaultValue: null,
            allowNull: true
        },
        vehicleStockId: {
            type: Sequelize.UUID
        },
        vehicleStock: {
            type: Sequelize.STRING,
            validate: {
                len: [0, 50]
            }
        },
        vehicleLocationId: {
            type: Sequelize.UUID
        },
        vehicleLocation: {
            type: Sequelize.STRING,
            validate: {
                len: [0, 50]
            }
        },
        storageLocationId: {
            type: Sequelize.UUID
        },
        storageLocation: {
            type: Sequelize.STRING,
            validate: {
                len: [0, 50]
            }
        },
        remark: {
            type: Sequelize.STRING,
            validate: {
                len: [0, 100]
            }
        },
        vehicleStatus:{
            type: Sequelize.ENUM,
            allowNull: false,
            values: [StatusEnum.vehicleStatus]
        },
        // vdcStatus:{
        //     type: Sequelize.STRING,
        //     validate: {
        //         len: [0, 50]
        //     }
        // },
        vdcStatus: {
            type: Sequelize.ENUM,
            allowNull: true,
            values: [StatusEnum.vdcStatus]
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
                    const makeModel = require('./index')
                    return makeModel.getOne({id: this.id}).then((record)=> {
                        if(!record) return next();
                        //get all code
                        return makeModel.getAll({
                            code: record.code
                            })
                            .then((res) => {
                                let recordArray = res.rows;
                                if(recordArray.length > 0) {
                                    recordArray.forEach((record) => {
                                        if (record && !record.deleted && this.id != record.id) {
                                            return next(errorDef.NOT_UNIQUE.message);
                                        }
                                    })
                                }
                                return next();
                            })
                            .catch((err) => {
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