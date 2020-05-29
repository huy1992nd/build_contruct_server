const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const modelName = "materialSales";
const tableName = "materialSales";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');




const MaterialMasterModel = require('../../models/19.materialMaster');
const UomModel = require('../../models/16.uom');
const MaterialSuperSessionModel = require('../../models/31.materialSuperSession')
const MaterialGroupCodeModel = require('../../models/22.materialGroupCode');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class MaterialSales extends Sequelize.Model {
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
        this.myAssociation = this.belongsTo(models.MaterialMaster, {
            foreignKey: 'materialMatId',
            sourceKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.Uom, {
            foreignKey: 'salesPurchaseUom',
            sourceKey: 'id'
        });
        // this.myAssociation = this.belongsTo(models.Material, 
        //         {foreignKey: 'purchaseUom',  sourceKey:'id'});
    }

    static getId(where) {
        //let status = {};
        //status['deleted'] = { [Op.not]: true };
        return this.findOne({
            where: {
                ...where,
                //[Op.and]: status
            },
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
                    model: MaterialMasterModel,
                    include: [{
                            model: MaterialGroupCodeModel
                        },
                        {
                            model: UomModel
                        },
                        {
                            model: MaterialSuperSessionModel
                        }
                    ]
                },
                {
                    model: UomModel
                }
            ];
        }

        let searchAllObj = {
            where: {
                ...where,
                // deleted: {
                //     [Op.not]: true
                // }
            },
            include,
            ...pagination,
            order: [orderBy],
            distinct: true
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

    static updateMaterialSales(materalData, where) {
        
            return this.update(materalData, {
                where: where
            });
    
    }

    static deleteHard(ids, colId = null) {
        let where = {};
        where[colId !== null ? colId : 'id'] = {
            [Op.in]: ids
        }
        
            return this.destroy({
                where
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

}