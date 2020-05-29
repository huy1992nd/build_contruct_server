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
        code: {
            type: Sequelize.STRING,
            allowNull: false,
            // validate: {
            //     NOT_UNIQUE: function (code, next) {
 
            //         const Function = require('.')
            //         let self = this;
            //         return Function.getAll({
            //             code
            //             })
            //             .then(function (record) {
            //                 record.forEach((record) => {
            //                     if (record && !record.deleted && self.id != record.id) {
            //                         return next(errorDef.NOT_UNIQUE.message);
            //                     }
            //                 })
            //                 return next();
            //             })
            //             .catch(function (err) {
            //                 return next(err);
            //             });
            //     },
            //     len: {
            //         args: [1, 20],
            //         msg: "Code length is not in this range"
            //     },
            // }
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        uomId:{
            type: Sequelize.STRING,
            allowNull: false
        },
        hours: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        amount: {
            type: Sequelize.DECIMAL(15,6),
            allowNull: true
        },
        // jobClassId: { 
        //     type: Sequelize.STRING, 
        //     allowNull: false, 
        //     onUpdate: 'cascade', 
        //     onDelete: 'SET NULL'
        // },
        materialId: {
            type: Sequelize.STRING, 
            allowNull: false, 
            onUpdate: 'cascade', 
            onDelete: 'SET NULL'
        },
        poGeneration: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.DISABLED,
            values: [StatusEnum.status],
        },
        jobGroupId: {
            type: Sequelize.UUID,
            references: {
                model: 'jobGroup',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'SET NULL'
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
            //                 code: record.code,
            //                 jobCatalogId: record.jobCatalogId
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