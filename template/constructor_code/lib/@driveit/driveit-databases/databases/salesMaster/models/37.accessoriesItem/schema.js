const Sequelize = require("sequelize");
const PickListStatusEnum = require('../enums/PickListStatus');
const InstallationStatusEnum = require('../enums/InstallationStatus');
const DismantleStatusEnum = require('../enums/DismantleStatus');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        packageId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        itemId: {
            type: Sequelize.STRING,
            allowNull: false
        },

        pickStatus: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: PickListStatusEnum.NEW,
            values: [PickListStatusEnum.status]
        },

        installationStatus: {
            type: Sequelize.ENUM,
            allowNull: true,
            values: [InstallationStatusEnum.status]
        },

        dismantleStatus: {
            type: Sequelize.ENUM,
            allowNull: true,
            values: [DismantleStatusEnum.status]
        },
        
        vendorId: {
            type: Sequelize.STRING,
            allowNull: true
        },

        accessoriesFitmentId: {
            type: Sequelize.STRING,
            allowNull: true
        },

        accessoriesDismantleId: {
            type: Sequelize.STRING,
            allowNull: true
        },

        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
            // validate: {
            //     NOT_UNIQUE: function (deleted, next) {
            //         if (deleted) {
            //             return next();
            //         }
            
            //         const Model = require('.')
            //         let self = this;
            //         return Model.getOne({
            //             id: self.id
            //         }).then((record) => {
            //             if (!record) return next();
            
            //             return Model.getAll({
            //                     bookingNo: record.bookingNo
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
        
        vehicleId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        packageTypeName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        itemTypeName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        
    };
}