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
        countryId: {
            type: Sequelize.STRING,
            allowNull: false,
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
            // validate: {
            //     NOT_UNIQUE: function (deleted, next) {
            //         if(deleted){
            //             return next();
            //         }

            //         const Model = require('.')
            //         let self = this;
            //         return Model.getOne({id: self.id}).then((record)=> {
            //             if(!record) return next();

            //             return Model.getAll({
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