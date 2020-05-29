const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "customerVehicleRelation";
const modelName = "customerVehicleRelation";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const CustomerMaster = require('../../../customerMaster');
const listing = require('../../../../utils/listing');

// const VehicleModel = require('../09.vehicle');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class CustomerVehicleRelation extends Sequelize.Model {
   
    //schema
    static init(sequelize, DataTypes, databaseName) {
        return super.init(schema(DataTypes), {
            tableName,
            modelName,
            schema: databaseName,
            sequelize
        });
    }
    
    //associations
    static associate(models) {
        this.myAssociation = this.belongsTo(models.Vehicle,{
            foreignKey: 'vehicleId',
            targetKey: 'id'
        });

        this.myAssociation = this.belongsTo(models.VehicleModel, {foreignKey: 'vehicleModelId', targetKey: 'id'});


        if(!_.isEmpty(CustomerMaster)){
            this.myAssociation = this.hasOne(CustomerMaster.CustomerDetails, {
                foreignKey: "id",
                sourceKey: "customerId",
    
            });
    
            this.myAssociation = this.hasOne(CustomerMaster.CustomerContact, {
                foreignKey: "id",
                sourceKey: "customerId"
            });
            
            this.myAssociation = this.hasOne(CustomerMaster.Customer, {
                foreignKey: "id",
                sourceKey: "customerId",
                //as: "customer"
            });
        }

        
    }

    //methods
    static getId(where) {
        return this.findOne({
            where : {
                ...where,
                deleted: {
                    [Op.not]: true 
                }
            },
            order: [
                ["createdAt", "DESC"]
            ]
        });
    }

    static getAll(where, attribute = [], pagination = {limit:null,offset:0}, orderBy = ["createdAt", "DESC"]) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy]
        });
    }

    // static getAllWithIncludes(whereObj, includes, pagination, orderBy, filterArr = []) {
    //     let arrFilter = Utils.filterGenerator(filterArr);
        
    //     if (arrFilter.length > 0) {
    //         _.forEach(arrFilter, (val) => {
    //             _.forEach(val, (v, k) => {
    //                 whereObj[k] = v;
    //             });
    //         });
    //     }        

    //     return this.findAndCountAll({
    //         where: {
    //             ...whereObj
    //         },
    //         include: includes,
    //         ...pagination,
    //         order: [orderBy]
    //     });
    // }
    static getRecords3({
        pagination,
        orderBy,
        where,
        include,
    }) {
        
        const commonAttr = ['id', 'code', 'name'];
        const customInclude = [{
                model: customerMaster.Customer,
                include: [
                    {
                        model: customerMaster.CustomerAccountGroup,
                        attributes: commonAttr,
                    },
                    {
                        model: customerMaster.CustomerDetails,
                        include: [{
                            model: customerMaster.CustomerContact,
                        }, ],

                    },
                ]
            },
            {
                model: specMaster.Vehicle,
                include: [
                    {
                        model: specMaster.Make,
                        attributes: commonAttr,
                    },
                    {
                        model: specMaster.Model,
                        attributes: commonAttr,
                    },
                    {
                        model: specMaster.Variant,
                        attributes: [...commonAttr, 'serviceModelCode'],
                    },
                    {
                        model: specMaster.Color,
                        attributes: commonAttr,
                    },
                ]
            }];
        return listing.getSearch({
            sequelizeModel: this,
            pagination,
            orderBy,
            where,
            include: customInclude
        });
    }

    static searchAll(likeArr = [], attributes = null, pagination, orderBy, filterArr = [], skipInclude = false) {
        let prepQry = [];
        let where = {};
        if(likeArr.length>0) {
            _.forEach(likeArr, (likeArrItem) => {
                let qry = {};
                qry[likeArrItem.colId] = {[Op.like]: likeArrItem.text};
                prepQry.push(qry);
            });
            where = {[Op.or]: prepQry};
        }
        
        let arrFilter = Utils.filterGenerator(filterArr);
        
        if (arrFilter.length > 0) {
            _.forEach(arrFilter, (val) => {
                _.forEach(val, (v, k) => {
                    where[k] = v;
                });
            });
        }

        let include = [];

        if(!skipInclude) {
            include = [
                // { 
                //     model: CustomerMaster.Customer,
                //     as: 'customer' 
                // },
                // {
                //     model: vehicleModel,
                //     separate:true,
                // },
            ];
        }

	    let searchAllObj = {
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            include,
            ...pagination,
            order: [orderBy]
        };
        if (attributes !== null && !_.isEmpty(attributes)) {
            searchAllObj['attributes'] = attributes;
        }

        return this.findAndCountAll(searchAllObj);
    }

    static searchAllNoCount(likeArr, attributes = []) {
        let prepQry = [];
        let where = {};
        if(likeArr.length>0) {
            _.forEach(likeArr, (likeArrItem) => {
                let qry = {};
                qry[likeArrItem.colId] = {[Op.like]: likeArrItem.text};
                prepQry.push(qry);
            });
            where = {
                [Op.or]: prepQry
            };
        };
        
        return this.findAll({
            where : {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            attributes
        });
    }

    static addNew(obj, transaction) {
        
            return this.create(
                obj
                , {
                returning: true,
                transaction: transaction
            });
        
    }

    static addRecord(record, transaction = null) {
        return this.create(record, {
            returning: true
        }, transaction);

    }
    
    static updateCustomerVehicleRelation(customerVehicleRelation, where) {
        
            return this.update(customerVehicleRelation, {
                where: where
            });
        
    }

    static deleteHard(where) {
        
            return this.destroy({
                where: where
            });
        
    }
    // static deleteSoft(where, who) {
    //     return this.update({
    //         deleted: true, updatedBy: who
    //     }, {
    //         where: where
    //     });
    // }

}