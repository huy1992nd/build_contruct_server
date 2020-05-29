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
        countryCode:{
            type:Sequelize.STRING(3),
            allowNull: false
        },
        orderNo: {
            type:Sequelize.STRING(21),
            allowNull: false
        },
        itemNo: {
            type:Sequelize.STRING(3),
            allowNull: true
        },
        jobNo: {
            type:Sequelize.STRING(10),
            allowNull: true
        },
        chargeType:{
            type:Sequelize.STRING(25),
            allowNull: true
        },
        billToParty:{
            type:Sequelize.STRING(255),
            allowNull: true
        },
        taxClassCust:{
            type:Sequelize.BOOLEAN,
            allowNull: true
        },
        jobClass:{
            type:Sequelize.STRING(5),
            allowNull: true
        },
        jobType:{
            type:Sequelize.STRING(25),
            allowNull: true
        },
        costCenter:{
            type:Sequelize.STRING,
            allowNull: true
        },
        packageID:{
            type:Sequelize.STRING,
            allowNull: true
        },
        packageType:{
            type:Sequelize.STRING,
            allowNull: true
        },
        wtyCategory:{
            type:Sequelize.STRING,
            allowNull: true
        },
        recallID:{
            type:Sequelize.STRING,
            allowNull: true
        },
        pricingDate:{
            type:Sequelize.DATEONLY,
            allowNull: true
        },
        itemType:{
            type:Sequelize.STRING(10),
            allowNull: true
        },
        item:{
            type:Sequelize.STRING(25),
            allowNull: true
        },
        itemDescription:{
            type:Sequelize.STRING,
            allowNull: true
        },
        referMaterial:{
            type:Sequelize.STRING,
            allowNull: true
        },
        materialType:{
            type:Sequelize.STRING(10),
            allowNull: true
        },
        materialGroup:{
            type:Sequelize.STRING(10),
            allowNull: true
        },
        make:{
            type:Sequelize.STRING(20),
            allowNull: true
        },
        storeLocation:{
            type:Sequelize.STRING(20),
            allowNull: true
        },
        itemStatus:{
            type:Sequelize.STRING(20),
            allowNull: true
        },
        quantity:{
            type:Sequelize.FLOAT(10,2),
            allowNull: true
        },
        UoM:{
            type:Sequelize.STRING(3),
            allowNull: true
        },
        unitCost:{
            type:Sequelize.FLOAT(10,2),
            allowNull: true
        },
        unitPrice:{
            type:Sequelize.FLOAT(10,2),
            allowNull: true
        },
        split:{
            type:Sequelize.FLOAT(10,2),
            allowNull: true
        },
        netCost:{
            type:Sequelize.FLOAT(10,2),
            allowNull: true
        },
        netPrice1:{
            type:Sequelize.FLOAT(10,2),
            allowNull: true
        },
        disc:{
            type:Sequelize.FLOAT(10,2),
            allowNull: true
        },
        discAmount:{
            type:Sequelize.FLOAT(10,2),
            allowNull: true
        },
        netPrice2:{
            type:Sequelize.FLOAT(10,2),
            allowNull: true
        },
        taxClassMat:{
            type:Sequelize.BOOLEAN,
            allowNull: true
        },
        taxAmount:{
            type:Sequelize.FLOAT(10,2),
            allowNull: true
        },
        taxCode:{
            type:Sequelize.STRING(5),
            allowNull: true
        },
        netPrice3:{
            type:Sequelize.FLOAT(10,2),
            allowNull: true
        },
        rounding:{
            type:Sequelize.STRING(25),
            allowNull: true
        },
        grossAmount:{
            type:Sequelize.FLOAT(10,2),
            allowNull: true
        },
        assignTo:{
            type:Sequelize.STRING,
            allowNull: true
        },
        subOrderNo:{
            type:Sequelize.STRING,
            allowNull: true
        },
        subOrderBranch:{
            type:Sequelize.STRING,
            allowNull: true
        },
        quotationNo:{
            type:Sequelize.STRING,
            allowNull: true
        },
        quotationPriceDate:{
            type:Sequelize.STRING,
            allowNull: true
        },
        aflOrderNo:{
            type:Sequelize.STRING,
            allowNull: true
        },
        jobStatus:{
            type:Sequelize.STRING,
            allowNull: true
        },
        unresolve:{
            type:Sequelize.STRING,
            allowNull: true
        },
        relevantforBilling:{
            type:Sequelize.BOOLEAN,
            allowNull: true
        },
        wtyIncidentNo:{
            type:Sequelize.STRING,
            allowNull: true
        },
        wtyIncidentNo:{
            type:Sequelize.STRING,
            allowNull: true
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
        inactivateReason: {
            type: Sequelize.STRING,
            allowNull: true
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: true
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: true
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    };
}