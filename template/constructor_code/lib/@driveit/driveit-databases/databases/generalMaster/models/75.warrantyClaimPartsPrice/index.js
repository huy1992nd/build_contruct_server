const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "warrantyClaimPartsPrice";
const modelName = "warrantyClaimPartsPrice";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

// const UomModel = require('../../models/16.uom');
// const CountryModel = require('../../models/01.country');
// const CurrencyModel = require('../../models/14.currency');
// const MaterialMaster = require('../../models/19.materialMaster');

module.exports = class WarrantyClaimPartsPrice extends Sequelize.Model {

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
        this.myAssociation = this.belongsTo(models.Country, { foreignKey: 'countryId' });
        this.myAssociation = this.belongsTo(models.Currency, { foreignKey: 'currencyId' });
        this.myAssociation = this.belongsTo(models.Uom, { foreignKey: 'uomId' });
        this.myAssociation = this.belongsTo(models.MaterialMaster, {
            foreignKey: 'partNumber'
        });
    }

    //methods
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

    static getAll(where, attribute = [], pagination = {
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
            include = [];
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

    static addNew(obj, transaction) {
        return this.create(
            obj, {
            returning: true,
            transaction: transaction
        });
    }

    static updateRecord(record, where, transaction = null) {
        return this.update(record, {
            where,
            isNewRecord: false
        }, transaction);
    }

    static deleteHard(where) {
        return this.destroy({
            where: where
        });
    }
    static deleteSoft(where, who, transaction) {
        return this.update({
            deleted: true,
            updatedBy: who
        }, {
            where: where,
            transaction: transaction
        });
    }

}
