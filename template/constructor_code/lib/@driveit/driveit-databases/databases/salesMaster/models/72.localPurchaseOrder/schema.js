const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');
module.exports = () => {
    return {
        id: {
            // ID generated from ID Service
            // type: Sequelize.UUID,
            type: Sequelize.STRING,
            primaryKey: true,
            // defaultValue: Sequelize.UUIDV1
        },
        lpoDate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        referenceNo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        vehicleBookingId: {
            type: Sequelize.STRING,
            allowNull:false,
            references: { model: 'vehicleBooking', key: 'id'},
        },
        bookingDate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        customerId: {
            type: Sequelize.CHAR(36),
            allowNull: false
        },
        vendorId: {
            type: Sequelize.CHAR(36),
            allowNull: false
        },
        remarks: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        totalPurchaseAmount: {
            type: Sequelize.STRING,
            allowNull: true
        },
        totalChargeableAmount: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: [StatusEnum.lpoStatus],
        },
        inactivateReason: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            // validate: {
            //     NOT_UNIQUE: function (deleted, next) {
            //         if(deleted){
            //             return next();
            //         }

            //         const Function = require('.')
            //         let self = this;
            //         return Function.getOne({id: self.id}).then((record)=> {
            //             if(!record) return next();
            //             //get all code
            //             return Function.getAll({
            //                 code: record.code
            //                 })
            //                 .then(function (record) {
            //                     record.forEach((record) => {
            //                         if (record && !record.deleted && self.id != record.id) {
            //                             return next(errorDef.NOT_UNIQUE.message);
            //                         }
            //                     })
            //                     return next();
            //                 })
            //                 .catch(function (err) {
            //                     return next(err);
            //                 });
            //         })
                   
            //     }
            // }
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        vehicleBookingBranchId: {
            type: Sequelize.CHAR(36),
            allowNull: true
        },
    };
}