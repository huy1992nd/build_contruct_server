const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "adhocAccessoriesOrder";
const modelName = "adhocAccessoriesOrder";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const AdhocAccessoriesItem = require('../46.adhocAccessoriesItem');
const VehicleBooking = require('../01.vehicleBooking');
const CustomerMaster = require('../../../customerMaster');
const Auth = require('../../../auth');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class AdhocAccessoriesOrder extends Sequelize.Model {
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
        this.myAssociation = this.hasMany(models.AdhocAccessoriesItem, {
            foreignKey: 'adhocAccessoriesOrderId', targetKey: 'id'
        });
     /*    this.myAssociation = this.hasOne(models.VehicleBooking, {
            foreignKey: 'id', sourceKey: 'vehicleBookingId'
        }); */
        this.myAssociation = this.belongsTo(models.VehicleBooking, {
            foreignKey: 'vehicleBookingId',
            targetKey: 'id'
        });

        if (!_.isEmpty(CustomerMaster)) {
            this.myAssociation = this.hasOne(CustomerMaster.Branch, {
                foreignKey: 'id',
                sourceKey: 'branchId'
            });
            this.myAssociation = this.hasOne(CustomerMaster.Company, {
                foreignKey: 'id',
                sourceKey: 'companyId'
            });
        }

        if (!_.isEmpty(Auth)) {
            this.myAssociation = this.hasOne(Auth.Tenants, {
                foreignKey: 'id',
                sourceKey: 'tenantId',
            });
        }
    }

    //methods
    static getOne(where, transaction = null) {
        return this.findOne({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            }
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
            include: [
                {
                    model: AdhocAccessoriesItem
                },
                {
                    model: VehicleBooking
                },
                {
                    model: CustomerMaster.Branch,
                    // attributes: ["code", "name", [Sequelize.fn('CONCAT', Sequelize.col('branch.code'), ' - ', Sequelize.col('branch.name')), 'branchName']]
                },
                {
                    model: CustomerMaster.Company,
                    // attributes: ["code", "name", [Sequelize.fn('CONCAT', Sequelize.col('tenant.company.code'), ' - ', Sequelize.col('tenant.company.name')), 'companyName']]
                },
                {
                    model: Auth.Tenants,
                    attributes: ["id", "name", "companyId", "branchId"],
                    // include: [{
                    //     model: CustomerMaster.Company,
                    //     // attributes: ["code", "name", [Sequelize.fn('CONCAT', Sequelize.col('tenant.company.code'), ' - ', Sequelize.col('tenant.company.name')), 'companyName']]
                    // }]
                }
            ]
        }, transaction);
    }

    static getRecords(pagination, orderBy, where, transaction = null, filterArr = [], filterTenant = [], skipInclude = false, whereBranch, whereCompany) {
        let arrFilter = Utils.filterGenerator(filterArr);

        if (arrFilter.length > 0) {
            _.forEach(arrFilter, (val) => {
                _.forEach(val, (v, k) => {
                    where[k] = v;
                });
            });
        }

        // tenant handle
        if (filterTenant !== undefined && !_.isEmpty(filterTenant)) {
            let tenantObj = {};
            let companyObj = {};
            let branchObj = {};
            let arr = [];
            _.forEach(filterTenant, (v) => {
                if (v.colId === 'tenantId') {
                    tenantObj['tenantId'] = { [Op.in]: v.text };
                }
                if (v.colId === 'companyId') {
                    companyObj['companyId'] = { [Op.in]: v.text };
                }
                if (v.colId === 'branchId') {
                    branchObj['branchId'] = { [Op.in]: v.text };
                }
            });
            if (_.size(tenantObj) > 0) {
                arr.push(tenantObj);
            }
            if (_.size(companyObj) > 0) {
                arr.push(companyObj);
            }
            if (_.size(branchObj) > 0) {
                arr.push(branchObj);
            }
            if (!_.isEmpty(arr)) {
                where = {
                    ...where,
                    [Op.or]: arr
                };
            }
        }

        let include = [];
        if (!skipInclude) {
            include = [
                { model: AdhocAccessoriesItem },
                {
                    model: VehicleBooking
                },
                {
                    model: CustomerMaster.Branch,
                    // attributes: ["code", "name", [Sequelize.fn('CONCAT', Sequelize.col('branch.code'), ' - ', Sequelize.col('branch.name')), 'branchName']]
                },
                {
                    model: CustomerMaster.Company,
                    // attributes: ["code", "name", [Sequelize.fn('CONCAT', Sequelize.col('tenant.company.code'), ' - ', Sequelize.col('tenant.company.name')), 'companyName']]
                },
                {
                    model: Auth.Tenants,
                    attributes: ["id", "name", "companyId", "branchId"],
                    // include: [{
                    //     model: CustomerMaster.Company,
                    //     // attributes: ["code", "name", [Sequelize.fn('CONCAT', Sequelize.col('tenant.company.code'), ' - ', Sequelize.col('tenant.company.name')), 'companyName']]
                    // }]
                }
            ];
        }

        return this.findAndCountAll({
            where: {
                ...where,
                deleted: {
                    [Op.not]: true
                }
            },
            include,
            ...pagination,
            order: [orderBy],
        }, transaction);
    }

    static searchAll(likeArr = [], attributes = null, pagination, orderBy, filterArr = [], skipInclude = false, filterTenant = []) {
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

        // tenant handle
        if (filterTenant !== undefined && !_.isEmpty(filterTenant)) {
            let tenantObj = {};
            let companyObj = {};
            let branchObj = {};
            let arr = [];
            _.forEach(filterTenant, (v) => {
                if (v.colId === 'tenantId') {
                    tenantObj['tenantId'] = { [Op.in]: v.text };
                }
                if (v.colId === 'companyId') {
                    companyObj['companyId'] = { [Op.in]: v.text };
                }
                if (v.colId === 'branchId') {
                    branchObj['branchId'] = { [Op.in]: v.text };
                }
            });
            if (_.size(tenantObj) > 0) {
                arr.push(tenantObj);
            }
            if (_.size(companyObj) > 0) {
                arr.push(companyObj);
            }
            if (_.size(branchObj) > 0) {
                arr.push(branchObj);
            }
            if (!_.isEmpty(arr)) {
                where = {
                    ...where,
                    [Op.and]: {
                        [Op.or]: arr
                    }
                };
            }
        }

        let include = [];
        if (!skipInclude) {
            include = [
                { model: AdhocAccessoriesItem },
                {
                    model: VehicleBooking
                },
                {
                    model: CustomerMaster.Branch,
                    // attributes: ["code", "name", [Sequelize.fn('CONCAT', Sequelize.col('branch.code'), ' - ', Sequelize.col('branch.name')), 'branchName']]
                },
                {
                    model: CustomerMaster.Company,
                    // attributes: ["code", "name", [Sequelize.fn('CONCAT', Sequelize.col('tenant.company.code'), ' - ', Sequelize.col('tenant.company.name')), 'companyName']]
                },
                {
                    model: Auth.Tenants,
                    attributes: ["id", "name", "companyId", "branchId"],
                    // include: [{
                    //     model: CustomerMaster.Company,
                    //     // attributes: ["code", "name", [Sequelize.fn('CONCAT', Sequelize.col('tenant.company.code'), ' - ', Sequelize.col('tenant.company.name')), 'companyName']]
                    // }]
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
            distinct: true,
            ...pagination,
            order: [orderBy]
        };
        if (attributes !== null && !_.isEmpty(attributes)) {
            searchAllObj['attributes'] = attributes;
        }

        return this.findAndCountAll(searchAllObj);
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

    static getCount(pagination, where, filterArr = []) {

        let arrFilter = Utils.filterGenerator(filterArr);

        if (arrFilter.length > 0) {
            _.forEach(arrFilter, (val) => {
                _.forEach(val, (v, k) => {
                    where[k] = v;
                });
            });
        }

        return this.count({
            where,
            ...pagination,
        });
    }

}