const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const modelName = "vendorBasic";
const tableName = "vendorBasic";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');




const VendorAccountGroupModel = require('../../models/35.vendorAccountGroup');
const VendorCommunicationModel = require('../../models/33.vendorCommunication');
const VendorGroupModel = require('../../models/34.vendorGroup');
const CountryModel = require('../../models/01.country');
const FinancierTypeModel = require('../70.financierType');

const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class VendorBasic extends ModelWithPublisher {
    //schema
    static init(sequelize, DataTypes, databaseName) {
        return super.init(schema(DataTypes), {
            tableName,
            modelName,
            schema: databaseName,
            sequelize
        });
    }

    static associate(models) {
        this.myAssociation = this.belongsTo(models.VendorAccountGroup, {
            foreignKey: 'vendorAccountGroupId'
        });
        this.myAssociation = this.belongsTo(models.VendorGroup, {
            foreignKey: 'vendorGroupId'
        });
        this.myAssociation = this.hasMany(models.VendorCommunication, {
            foreignKey: 'vendorId',
            sourceKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.Country, {
            foreignKey: 'countryId'
        });
        // this.myAssociation = this.belongsTo(models.Material, 
        //         {foreignKey: 'purchaseUom',  sourceKey:'id'});
        this.myFinancierType = this.belongsTo(models.FinancierType, {
            foreignKey: 'financierTypeId'
        });
    }

    static getId(where) {
        let status = {};
        status['deleted'] = {
            [Op.not]: true
        };
        return this.findOne({
            where: {
                ...where,
                [Op.and]: status
            },
            include: [
                { 
                    model: VendorAccountGroupModel,
                    attributes: ["id", "code"],
                },
                { 
                    model: VendorGroupModel,
                    attributes: ["id", "code"],
                },
            ],
            // attributes: ["id"],
            order: [
                ["createdAt", "DESC"]
            ]
        });
    }

    static getAll(where, attributes = [], pagination = {
        limit: null,
        offset: 0
    }, orderBy = ["createdAt", "DESC"]) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy]
        });
    }

    static getAllByIds(ids, attribute = [], pagination = {
        limit: null,
        offset: 0
    }, orderBy = ["createdAt", "DESC"]) {
        let where = {};
        if (!_.isEmpty(ids)) {
            where = {
                id: {
                    [Op.in]: ids
                }
            };
        }
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy]
        });
    }

    static searchAll(likeArr, attributes = null, pagination, orderBy, filterArr = [], skipInclude = false) {
        let prepQry = [];
        let where = {};
        if (likeArr.length > 0) {
            _.forEach(likeArr, (likeArrItem) => {
                let qry = {};
                qry[likeArrItem.colId] = {
                    [Op.like]: likeArrItem.text
                };
                prepQry.push(qry);
            });
            where = {
                [Op.or]: prepQry
            };
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
        if (!skipInclude) {
            include = [{
                    model: CountryModel
                },
                {
                    model: VendorAccountGroupModel
                },
                {
                    model: VendorGroupModel
                },
                {
                    model: VendorCommunicationModel,
                    separate: true,
                },
                {
                    model: FinancierTypeModel
                }
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
            order: [orderBy],
            distinct: true,
            subQuery: false, 
        };
        if (attributes !== null && !_.isEmpty(attributes)) {
            searchAllObj['attributes'] = attributes;
        }

        return this.findAndCountAll(searchAllObj);
    }

    static addNew(obj, transaction) {
        
            return this.create(
                obj, {
                    returning: true,
                    transaction: transaction
                });
       
    }

    static updateBasicData(basicData, where) {
        
            return this.update(basicData, {
                where: where
            });
       
    }

    static deleteHard(where) {
        
            return this.destroy({
                where: where
            });
       
    }
    static deleteSoft(where, who) {
        
            return this.update({
                deleted: true,
                updatedBy: who
            }, {
                where: where
            });
     
    }

    static getItem(where, include){
        let searchAllObj = {
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            include,
        };
        return this.findAndCountAll(searchAllObj);
    }

}