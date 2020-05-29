const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.CHAR(36),
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        transferId : {
            type: Sequelize.STRING,
        },
        doType: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        bdoId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        vehicleId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        vehicleStockId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        vehicleBusinessTypeId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        makeId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        modelId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        variantId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        productId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        colorId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        chassisNo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        engineNo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        regNo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        transferDate: {
            type: Sequelize.DATE,
            allowNull: true,
        },

        tenantId: {
            type: Sequelize.UUID,
            allowNull: true,
        },
        tenantCompanyId: {
            type: Sequelize.UUID,
            allowNull: true,
        },
        currentLocationId:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        
        designatedLocationId:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        referenceNo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        referenceDate: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        deliveryDate: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        remark: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        cancelReason : {
            type: Sequelize.STRING,
            allowNull: true,
        },
        rejectReason : {
            type: Sequelize.STRING,
            allowNull: true,
        },
        currentStorageLocationId:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        designatedStorageLocationId:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        designatedDropPointId:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        vendorId:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.TRANSFERSTATUS.NEW,
            values: [StatusEnum.transferStatus],
        },
        acknowledgeStatus: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ACKNOWLEDGESTATUS.NEW,
            values: [StatusEnum.acknowledgeStatus],
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
        tdoType: {
            type: Sequelize.STRING,
            allowNull: true
        },
        branchId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        contractorId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        issuesCompanyId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        transactionChargeable: {
            type: Sequelize.BOOLEAN,
            allowNull: true
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