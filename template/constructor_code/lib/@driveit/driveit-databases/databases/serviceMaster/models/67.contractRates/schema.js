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
        contractYear: {
            type: Sequelize.STRING,
            allowNull:true
        },
        mileageFrom: {
            type: Sequelize.STRING,
            allowNull:true
        },
        hourFrom: {
            type: Sequelize.STRING,
            allowNull:true
        },
        mileageTo: {
            type: Sequelize.STRING,
            allowNull:true
        },
        hourTo: {
            type: Sequelize.STRING,
            allowNull:true
        },
        mileageRate: {
            type: Sequelize.STRING,
            allowNull:true
        },
        hourRate: {
            type: Sequelize.STRING,
            allowNull:true
        },
        maintenanceCost: {
            type: Sequelize.STRING,
            allowNull:true
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