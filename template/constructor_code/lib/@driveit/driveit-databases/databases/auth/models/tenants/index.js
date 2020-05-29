const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "tenants";
const modelName = "tenants";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const customerMaster = require('../../../customerMaster');
const listing = require('../../../../utils/listing');
// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class Tenants extends Sequelize.Model {

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
        this.myAssociation = this.belongsTo(models.Tags, {
            foreignKey: 'tagId',
            targetKey: 'id'
        });

        if (!_.isEmpty(customerMaster)) {
            this.myAssociation = this.hasOne(customerMaster.Branch, {
                sourceKey: "branchId",
                foreignKey: 'id',
            });

            this.myAssociation = this.hasOne(customerMaster.Company, {
                sourceKey: "companyId",
                foreignKey: 'id',
            });
        }

        // this.myAssociation = this.hasMany(models.UsersTenants, {foreignKey: 'tenantId'});
        // this.myAssociation = this.hasMany(models.TenantsTags, {foreignKey: 'tenantId'}); 
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

    static getRecords3({
        pagination,
        orderBy,
        where,
        include,
    }) {
        const customInclude = [
           
        ];
        
        return listing.getSearch({
            sequelizeModel: this,
            pagination,
            orderBy,
            where,
            include: include || customInclude
        });
    }

    static addTenant(tenantObj, transaction) {
        return this.create(
            tenantObj, {
            returning: true,
            transaction: transaction
        });
    }

    static updateTenant(tenant, where) {
        return this.update(tenant, {
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
