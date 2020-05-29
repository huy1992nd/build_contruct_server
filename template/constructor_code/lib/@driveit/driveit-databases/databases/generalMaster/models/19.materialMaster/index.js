const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const modelName = "materialMasterBasicinfo";
const tableName = "materialMasterBasicinfo";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

// const cacheKey = `getData_materialMaster`;

const MaterialTypeModel = require('../../models/18.materialType');
const MaterialModel = require('../../models/22.materialGroupCode');
const UomModel = require('../../models/16.uom');
const CountryModel = require('../../models/01.country');
const QuantityConversionModel = require('../../models/26.materialQuantityConv');
const ProcurementModel = require('../../models/27.materialProcurement');
const MaterialContractorModel = require('../../models/20.materialContractor');
const SalesModel = require('../../models/28.materialSales');
const AccountingModel = require('../../models/29.materialAccounting');
const StorageModel = require('../../models/30.materialStorage');
const SuperSessionModel = require('../../models/31.materialSuperSession');
const MaterialWarrantyModel = require('../../models/73.materialWarranty');
const MaterialMakeIdsModel = require('../../models/76.materialMakeIds');

const customerMaster = require('../../../customerMaster');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class MaterialMaster extends Sequelize.Model {
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

        // -----------//

        this.myAssociation = this.hasMany(models.Sales, {
            foreignKey: 'materialMatId',
            sourceKey: "id"
        });

        this.myAssociation = this.hasMany(models.Accounting, {
            foreignKey: 'accountingId',
            sourceKey: "id"
        });

        this.myAssociation = this.hasMany(models.Storage, {
            foreignKey: 'materialId',
            sourceKey: "id"
        });

        this.myAssociation = this.hasMany(models.Procurement, {
            foreignKey: 'procurementId',
            sourceKey: 'id'
        });

        this.myAssociation = this.hasMany(models.SuperSession, {
            foreignKey: 'superSessionId',
            sourceKey: 'id'
        });

        this.myAssociation = this.hasMany(models.materialWarranty, {
            foreignKey: 'warrantyId',
            sourceKey: 'id'
        });
        this.myAssociation = this.hasMany(models.MaterialMakeId, {
            foreignKey: 'materialId',
            sourceKey: 'id'
        });

        this.myAssociation = this.hasMany(models.MaterialContractor, {
            foreignKey: 'materialMasterBasicinfoId',
            sourceKey: 'id'
        });

        this.myAssociation = this.hasMany(models.QuantityConversion, {
            foreignKey: 'materialMatId',
            sourceKey: 'id'
        });
        // -----------//

        this.myAssociation = this.belongsTo(models.Material, {
            foreignKey: 'materialGroupId'
        });

        this.myAssociation = this.belongsTo(models.MaterialType, {
            foreignKey: 'materialTypeId'
        });

        this.myAssociation = this.belongsTo(models.Country, {
            foreignKey: 'countryId'
        });

        this.myAssociation = this.belongsTo(models.Uom, {
            foreignKey: 'materialUomId'
        });

        this.myAssociation = this.hasMany(models.WarrantyClaimPartsPrice, {
            foreignKey: 'partNumber',
            sourceKey: 'id'
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
        let whereMake = {};

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
                    if (k === 'makeId') {
                        // queries.make[k] = v;
                        whereMake[k] = v;
                    } else {
                        where[k] = v;
                    }
                });
            });
        }
        const generalAttributes = ['id', 'code', 'name'];
        let include = [];
        if (!skipInclude) {
            include = [{
                model: MaterialModel,
                attributes: [...generalAttributes],
            },
            {
                model: UomModel,
                attributes: [...generalAttributes],
            },
            {
                model: MaterialTypeModel,
                attributes: [...generalAttributes],
            },
            {
                model: CountryModel,
                attributes: [...generalAttributes],
            },
            {
                model: QuantityConversionModel,
                separate: true,
            },
            {
                model: SalesModel,
                separate: true,
            },
            {
                model: ProcurementModel,
                attributes: ['id', 'branch', 'make', 'vendor', 'vendorMaterialNo', 'procurementMakeName', 'procurementBranchName', 'procurementUomName', 'itemCategory', 'procurementId', 'purchaseUom'],
                separate: true,
            },
            {
                model: AccountingModel,
                separate: true,
            },
            {
                model: StorageModel,
                separate: true,
                // where: { deleted: {[Op.not]: true} },
                /*include: [
                    {
                        model: customerMaster.StorageLocation,
                        // where: { deleted: {[Op.not]: true} },
                        as: 'storageLocation',
                        include: [
                            {
                                model: customerMaster.Storage,
                                // where: { deleted: {[Op.not]: true} },
                                as: 'storage'
                            }
                        ]
                    }
                ]*/
            },
            {
                model: SuperSessionModel,
                separate: true,
            },
            {
                model: MaterialContractorModel,
                separate: true,
            },
            {
                model: MaterialWarrantyModel,
                separate: true,
            },
            {
                model: MaterialMakeIdsModel,
                attributes: ['makeId'],
                separate:true,
                // where: {
                //     ...queries.make
                // }
                where: whereMake
            },

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

    static lookupMaterial(likeArr, attributes = null, pagination, orderBy, filterArr = [], skipInclude = false) {
        const queries = {
            make: {}
        };
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
                    if (k === 'makeId') {
                        queries.make[k] = v;
                    } else {
                        where[k] = v;
                    }
                });
            });
        }

        let include = [];
        if (!skipInclude) {
            include = [{
                model: MaterialModel
            },
            {
                model: UomModel
            },
            {
                model: MaterialTypeModel
            },
            {
                model: CountryModel
            },
            {
                model: MaterialMakeIdsModel,
                where: {
                    ...queries.make
                }
            }];
        }

        let searchAllObj = {
            where: {
                ...where,
                deleted: false
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

    static updateMaterial(materalData, where) {

        return this.update(materalData, {
            where: where
        });

    }

    static deleteHard(ids) {

        return this.destroy({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
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