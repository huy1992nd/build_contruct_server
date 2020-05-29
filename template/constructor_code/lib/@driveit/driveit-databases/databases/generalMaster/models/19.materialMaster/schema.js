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
        materialId: {
            type: Sequelize.STRING,
            allowNull: true
            // unique: true
            // validate: {
            //     NOT_UNIQUE: function (materialId, next) {

            //         const Model = require('.')
            //         let self = this;
            //         return Model.getAll({
            //             materialId
            //             })
            //             .then(function (record) {
            //                 record.rows.forEach((record) => {
            //                     if (record && !record.deleted && self.id != record.id) {
            //                         return next(errorDef.NOT_UNIQUE.message);
            //                     }
            //                 })
            //                 return next();
            //             })
            //             .catch(function (err) {
            //                 return next(err);
            //             });
            //     }
            // }
        },
        materialDescription: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: '0'
        },
        warrantyTolerenceDistance: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        warrantyTolerenceMonths: {
            type: Sequelize.STRING,
            allowNull: true
        },
        make: {
            type: Sequelize.STRING,
            allowNull: true
        },
        vendor: {
            type: Sequelize.STRING,
            allowNull: true
        },
        vendorMaterialNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ENABLED,
            values: [StatusEnum.status],
        },
        remarks: {
            type: Sequelize.STRING,
            allowNull: true,
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

                    const Model = require('./index')
                    return Model.getId({
                        id: this.id
                    }).then((record) => {
                        if (!record) return next();
                        //get all code
                        return Model.getAll({
                            code: record.code
                        })
                            .then((res) => {
                                let recordArray = res.rows;
                                if (recordArray.length > 0) {
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
            allowNull: true
        },
        fileName: {
            type: Sequelize.STRING(2000),
            allowNull: true
        },
        fileUrl: {
            type: Sequelize.STRING(2000),
            allowNull: true
        },
        uploadBy: {
            type: Sequelize.STRING(2000),
            allowNull: true
        },
        uploadDate: {
            type: Sequelize.STRING(2000),
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
        quantityId: {
            type: Sequelize.STRING,
            allowNull: true
        },
       
    }
}