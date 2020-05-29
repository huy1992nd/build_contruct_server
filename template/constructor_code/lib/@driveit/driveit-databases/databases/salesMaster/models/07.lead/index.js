const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "lead";
const modelName = "lead";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');
const specMaster = require('../../../specMaster');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Lead extends Sequelize.Model {
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
        this.myAssociation = this.belongsTo(models.LeadSource, { foreignKey: 'leadSourceId', targetKey: 'id' });
        this.myAssociation = this.belongsTo(models.LeadType, { foreignKey: 'leadTypeId', targetKey: 'id' });
        this.myAssociation = this.belongsTo(models.LeadSourceGroup, { foreignKey: 'leadSourceGroupId', targetKey: 'id' });
        this.myAssociation = this.belongsTo(models.LeadCustomer, { foreignKey: 'leadCustId', targetKey: 'id' });
        //not yet create master data
        /*  this.myAssociation = this.belongsTo(models.PartGroup, {
             foreignKey: 'uomId',
             targetKey: 'id'
         }); */

        ////let masterdataSpecTypes = ["vehicleUsage", "color", "product", "make", "model", "variant"];
        this.myAssociation = this.hasOne(specMaster.VehicleUsage, {
            sourceKey: "vehicleUsageId",
            foreignKey: "id",
        });
        this.myAssociation = this.hasOne(specMaster.Color, {
            sourceKey: "colorId",
            foreignKey: "id",
        });
        this.myAssociation = this.hasOne(specMaster.Product, {
            sourceKey: "productId",
            foreignKey: "id",
        });
        this.myAssociation = this.hasOne(specMaster.Make, {
            sourceKey: "makeId",
            foreignKey: "id",
        });
        this.myAssociation = this.hasOne(specMaster.Model, {
            sourceKey: "modelId",
            foreignKey: "id",
        });
        this.myAssociation = this.hasOne(specMaster.Variant, {
            sourceKey: "variantId",
            foreignKey: "id",
        });
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
        }, transaction);
    }

    static getAll(where, transaction = null) {
        return this.findAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
        }, transaction);
    }


    static getRecords(pagination, orderBy, where, transaction = null) {
        return this.findAndCountAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            ...pagination,
            order: [orderBy],
        }, transaction);
    }

    static searchAll(likeArr = [], attributes = null, pagination, orderBy, filterArr = [], skipInclude = false) {
        let prepQry = [];
        let where = {};
        if (likeArr.length > 0) {
            _.forEach(likeArr, (likeArrItem) => {
                let qry = {};
                qry[likeArrItem.colId] = { [Op.like]: likeArrItem.text };
                prepQry.push(qry);
            });
            where = { [Op.or]: prepQry };
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
            include = [
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
        if (likeArr.length > 0) {
            _.forEach(likeArr, (likeArrItem) => {
                let qry = {};
                qry[likeArrItem.colId] = { [Op.like]: likeArrItem.text };
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

    static addRecord(record, transaction = null) {
        return this.create(record, {
            returning: true
        }, transaction);

    }

    static updateRecord(record, where, transaction = null) {
        return this.update(record, {
            where,
            isNewRecord: false
        }, transaction);
    }

    static deleteRecord(where, transaction = null) {
        return this.destroy({
            where: where
        }, transaction);
    }

    static getAllWithIncludes(whereObj, includes, pagination, orderBy) {
        return this.findAndCountAll({
            where: {
                ...whereObj

            },
            include: includes,
            ...pagination,
            order: [orderBy]
        });
    }

}