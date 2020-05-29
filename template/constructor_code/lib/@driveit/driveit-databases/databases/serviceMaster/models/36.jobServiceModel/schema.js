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
        serviceModelCode: {
            type: Sequelize.STRING,
            allowNull:true
        },
        engineCode: {
            type: Sequelize.STRING,
            allowNull:true
        },
        hours: {
            type: Sequelize.STRING,
            allowNull:false
        },
        chargeable: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: [StatusEnum.status],
        },
        recommendedFrom: {
            type:Sequelize.INTEGER,
            allowNull: false
        },
        recommendedTo: {
            type:Sequelize.INTEGER,
            allowNull: false
        },
        bodyTypeId: {
            type: Sequelize.STRING,
            allowNull:true
        },
        modelGroupId: {
            type: Sequelize.STRING,
            allowNull:false
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