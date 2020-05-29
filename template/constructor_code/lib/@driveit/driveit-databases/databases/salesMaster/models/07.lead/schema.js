const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');
const errorDef = require('../../../../utils/error.codes');

module.exports = () => {
    return {
        id: { // get from id services
            type: Sequelize.STRING,
            primaryKey: true
        },
        leadStatusId:{
            type:Sequelize.STRING
        },
        leadStatusName:{
            type:Sequelize.STRING
        },
        // status: {
        //     type: Sequelize.ENUM,
        //     allowNull: false,
        //     defaultValue: StatusEnum.ENABLED,
        //     values: [StatusEnum.status],
        // },
        leadDate:{
            type:Sequelize.DATE,
            allowNull: false,
        },
        makeId:{
            type:Sequelize.STRING,
            allowNull: true
        },
        modelId:{
            type:Sequelize.STRING,
            allowNull: true
        },
        variantId:{
            type:Sequelize.STRING,
            allowNull: true
        },
        productId:{
            type:Sequelize.STRING,
            allowNull: true
        },
        quantity:{
            type:Sequelize.INTEGER,
            allowNull:true
        },
        colorId:{
            type:Sequelize.STRING,
            allowNull:true
        },
        vehicleUsageId:{
            type:Sequelize.STRING,
            allowNull:true
        },
        testDriveDate:{
            type:Sequelize.DATE,
            allowNull:true
        },
        isExistVehicle:{
            type:Sequelize.BOOLEAN,
            allowNull:false,
            defaultValue: false,
        },
        followupDate:{
            type:Sequelize.DATE,
            allowNull:true,
        },
        followupNote:{
            type:Sequelize.STRING,
            allowNull:true
        },
        salesAdvisorId:{
            type:Sequelize.STRING(36),
            allowNull:true
        },
        salesAdvisorEmployeeId:{
            type:Sequelize.STRING,
            allowNull:true
        },
        salesAdvisorName:{
            type:Sequelize.STRING,
            allowNull:true
        },
        branchId:{
            type:Sequelize.STRING(36),
            allowNull:true
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
            //         return Model.getId({id: this.id}).then((record)=> {
            //             if(!record) return next();
            //             //get all code
            //             return Model.getAll({
            //                 code: record.code
            //                 })
            //                 .then((res) => {
            //                     let recordArray = res.rows;
            //                     if(recordArray.length > 0) {
            //                         recordArray.forEach((record) => {
            //                             if (record && !record.deleted && this.id != record.id) {
            //                                 return next(errorDef.NOT_UNIQUE.message);
            //                             }
            //                         })
            //                     }
            //                     return next();
            //                 })
            //                 .catch((err) => {
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