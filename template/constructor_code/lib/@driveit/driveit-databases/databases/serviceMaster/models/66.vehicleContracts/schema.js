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
        vehicleId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        regNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        chassisNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        engineNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        intialMileage: {
            type: Sequelize.STRING,
            allowNull: true
        },
        intialHours: {
            type: Sequelize.STRING,
            allowNull: true
        },
        maximumMileage: {
            type: Sequelize.STRING,
            allowNull: true
        },
        maximumHours: {
            type: Sequelize.STRING,
            allowNull: true
        },
        committedMileage: {
            type: Sequelize.STRING,
            allowNull: true
        },
        committedHours: {
            type: Sequelize.STRING,
            allowNull: true
        },
        minimumMileage: {
            type: Sequelize.STRING,
            allowNull: true
        },
        minimumHours: {
            type: Sequelize.STRING,
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
            // allowNull: false
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

            //         const Education = require('.')
            //         let self = this;
            //         return Education.getOne({id: self.id}).then((record)=> {
            //             if(!record) return next();
            //             //get all code
            //             return Education.getAll({
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
        }
    };
}