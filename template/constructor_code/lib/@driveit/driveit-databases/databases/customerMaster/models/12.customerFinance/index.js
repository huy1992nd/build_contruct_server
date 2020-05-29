const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "customerFinance";
const modelName = "customerFinance";

const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');




const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
// module.exports = class CustomerFinance extends ModelWithPublisher {
module.exports = class CustomerFinance extends Sequelize.Model {
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
        this.myAssociation = this.belongsTo(models.CustomerDetails, {
            foreignKey: 'customerDetailsId'
        });
        this.myAssociation = this.belongsTo(models.TaxClass, {
            foreignKey: 'taxClassId',
            // sourceKey: "taxClassId",
        });
        this.myAssociation = this.belongsTo(models.CustomerGroup, {
            foreignKey: 'customerGroupId'
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

        if (!skipInclude) {
            include = [];
        }

        let searchAllObj = {
            where: {
                ...where,
                [Op.and]: whereFilter
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

    static updateCustomerFinance(customerFinance, where) {
        
            return this.update(customerFinance, {
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

}