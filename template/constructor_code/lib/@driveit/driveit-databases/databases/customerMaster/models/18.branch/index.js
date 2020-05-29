const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "branch";
const modelName = "branch";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const TaxClass = require('../8.taxclass');
const StorageLocation = require("../20.storageLocation");
const BranchMakeBusinessType = require("../36.branchMakeBusinessTypes");
const Company = require('../7.company');
const DealerGroup = require('../29.dealerGroup');
const BranchRoutes = require("../31.branchRoutes");
const StorageModel = require("../25.storage");

const generalMaster = require('../../../generalMaster');

const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Branch extends ModelWithPublisher {
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
        /*  this.myAssociation = this.hasMany(models.Model, {
             foreignKey: 'contactRelationshipId',
             sourceKey: 'id'
         }, {
             onDelete: 'CASCADE'
         }); */
        this.myAssociation = this.belongsTo(models.TaxClass, {
            foreignKey: 'taxclassId',
            sourceKey: 'id'
        });
        this.myAssociation = this.hasMany(models.BranchBusinessStream, {
            foreignKey: 'branchId',
            sourceKey: 'id'
        });

        this.myAssociation = this.hasMany(models.BranchMakeBusinessType, {
            foreignKey: 'branchId',
            sourceKey: 'id'
        });

        // this.myAssociation = this.hasMany(models.BranchRoutes);
        this.myAssociation = this.hasMany(models.BranchRoutes, {
            foreignKey: 'branchId',
            sourceKey: 'id'
        });

        this.myAssociation = this.hasMany(models.BranchBusinessType, {
            foreignKey: 'branchId',
            sourceKey: 'id'
        });

        this.myAssociation = this.hasMany(models.StorageLocation, {
            foreignKey: 'branchId',
            sourceKey: 'id'
        });

        this.myAssociation = this.belongsTo(models.Company, {
            foreignKey: 'companyId'
        });
        if(!_.isEmpty(generalMaster)) {
            this.myAssociation = this.hasOne(generalMaster.PostCode, {
                sourceKey: "postcodeId",
                foreignKey: "id"
            });
            this.myAssociation = this.hasOne(generalMaster.City, {
                sourceKey: "cityId",
                foreignKey: "id"
            });
            this.myAssociation = this.hasOne(generalMaster.State, {
                sourceKey: "stateId",
                foreignKey: "id"
            });
            this.myAssociation = this.hasOne(generalMaster.Country, {
                sourceKey: "countryId",
                foreignKey: "id"
            });
            this.myAssociation = this.hasOne(generalMaster.Currency, {
                sourceKey: "currencyId",
                foreignKey: "id"
            });
        }
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where
        }, transaction);
    }

    static searchAll(likeArr, attributes = null, pagination, orderBy, filterArr = [], skipInclude = false, optShowAll = false) {
        let prepQry = [];
        let where = {};

        let whereFilter = [
            !optShowAll ? {
                deleted: false
            } : {}
        ]; //for filtering deleted

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

        const commonAttr = [
            'id',
            'code',
            'name',
        ]

        if (!skipInclude) {
            include = [
                //showing CustomerDetailsModel issue
                // {model: CustomerDetailsModel,
                //     include: [
                //         {model: CustomerFinanceModel},
                //         {model: CustomerContactModel},

                //     ]
                // },
                {
                    model: StorageLocation,
                    include: [
                        { model: StorageModel, attributes: commonAttr },
                        { model: generalMaster.City, attributes: commonAttr },
                        { model: generalMaster.State, attributes: commonAttr },
                        { model: generalMaster.PostCode, attributes: ['id', 'code'] },
                        { model: generalMaster.Country, attributes: commonAttr }
                    ]
                },
                {
                    model: BranchRoutes
                },
                {
                    model: BranchMakeBusinessType
                }
            ];
        }

        let searchAllObj = {
            where: {
                ...where,
                [Op.and]: whereFilter
            },
            include,
            distinct: true,
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
        };

        return this.findAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            attributes
        });
    }

    static getAll(where) {
        return this.findAll({
            where
        });
    }

    static getAllData(where, attributes = [], pagination = {
        limit: null,
        offset: 0
    }, orderBy = ["createdAt", "DESC"]) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy]
        });
    }

    static getRecords(pagination, orderBy, where, filterArr = []) {
        let arrFilter = Utils.filterGenerator(filterArr);

        if (arrFilter.length > 0) {
            _.forEach(arrFilter, (val) => {
                _.forEach(val, (v, k) => {
                    where[k] = v;
                });
            });
        }

        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy],
            subQuery: false,
            include: [{
                model: TaxClass,
            },
            {
                model: StorageLocation,
                include: [
                    { model: StorageModel, attributes: commonAttr },
                    { model: generalMaster.City, attributes: commonAttr },
                    { model: generalMaster.State, attributes: commonAttr },
                    { model: generalMaster.PostCode, attributes: ['id', 'code'] },
                    { model: generalMaster.Country, attributes: commonAttr }
                ]
            },
            {
                model: BranchRoutes
            },
            {
                model: BranchMakeBusinessType
            }
            ],
        });
    }

    static addRecord(record) {
        // 
        return this.create(record, {
            returning: true
        });
        // });
    }

    static addNew(obj, transaction) {

        return this.create(
            obj, {
            returning: true,
            transaction: transaction
        });
    }

    static updateRecord(record, where) {

        return this.update(record, {
            where
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

    static getBranchByDealer(likeArr, attributes = [], pagination, orderBy, filterArr = [], optShowAll = false, includeSearch = false) {
        let prepQry = [];
        let where = {};

        let whereFilter = [
            !optShowAll ? {
                deleted: false
            } : {}
        ]; //for filtering deleted

        let include = [];

        if (includeSearch) {
            include = [{
                model: Company,
                include: [{
                    model: DealerGroup
                }]
            }]
        }

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

        filterArr.forEach((eachFilter) => {
            switch (eachFilter.colId) {
                case "dealerGroupCode":
                    eachFilter.colId = '$company.dealerGroup.code$';
                    break;
            }
        })

        let arrFilter = Utils.filterGenerator(filterArr);

        if (arrFilter.length > 0) {
            _.forEach(arrFilter, (val) => {
                _.forEach(val, (v, k) => {
                    where[k] = v;
                });
            });
        }

        return this.findAndCountAll({
            where: {
                ...where,
                [Op.and]: whereFilter
            },
            attributes,
            include,
            ...pagination,
            order: [orderBy]
        });
    }

}