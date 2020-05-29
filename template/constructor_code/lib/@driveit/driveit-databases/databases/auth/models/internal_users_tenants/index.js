const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "internal_users_tenants";
const modelName = "internal_users_tenants";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');
const listing = require('../../../../utils/listing');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class InternalUsersTenants extends Sequelize.Model {

    //schema
    static init(sequelize, databaseName) {
        return super.init(schema(), {
            tableName,
            modelName,
            schema: databaseName,
            sequelize
        });
    }

    //associations
    static associate(models) {
        this.myAssociation = this.belongsTo(models.InternalUsers, { foreignKey: 'internalUserId', targetKey: 'id' });
        this.myAssociation = this.belongsTo(models.Tenants, { foreignKey: 'tenantId' });
        this.myAssociation = this.belongsTo(models.Tags, { foreignKey: 'tagId' });

        // this.myAssociation = this.belongsTo(models.UsersTenants);
        // or
        // this.myAssociation = models.MyModel.belongsTo(models.OtherModel);      
    }

    //methods
    static getId(where) {
        return this.findOne({
            where,
            attributes: ["id"],
            order: [
                ["createdAt", "DESC"]
            ]
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
                ...where
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

    static getRecords3({
        pagination,
        orderBy,
        where,
        include,
    }) {
        const customInclude = [];
        
        return listing.getSearch({
            sequelizeModel: this,
            pagination,
            orderBy,
            where,
            include: include || customInclude
        });
    }

    static addRecord(userTenant, transaction) {
        return this.create(userTenant, {
            returning: true,
            transaction: transaction
        });
    }

    static updateRecord(userTenant, where, transaction) {
        return this.update(userTenant, {
            where,
            returning: true,
            transaction: transaction
        });
    }

    static deleteRecord(where) {
        return this.destroy({
            where: where
        });
    }

}
