const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "employees";
const modelName = "employees";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');
const listing = require('../../../../utils/listing');
const generalMaster = require('../../../generalMaster');
const customerMaster = require('../../../customerMaster');
const EmployeeType = require('../employeeType');
const EmployeePosition = require('../employeePosition');

module.exports = class Employees extends Sequelize.Model {

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
        if (!_.isEmpty(generalMaster)) {
            this.myAssociation = this.hasOne(generalMaster.Country, {
                sourceKey: "countryId",
                foreignKey: 'id',
            });
            this.myAssociation = this.hasOne(generalMaster.VendorBasic, {
                sourceKey: "vendorId",
                foreignKey: 'id',

            });
        }

        if (!_.isEmpty(customerMaster)) {
            this.myAssociation = this.hasOne(customerMaster.Company, {
                sourceKey: "companyId",
                foreignKey: 'id',
            });
            this.myAssociation = this.hasOne(customerMaster.Branch, {
                sourceKey: "branchId",
                foreignKey: 'id',
            });
        }

        this.myAssociation = this.belongsTo(models.InternalUsers, {
            foreignKey: 'internalUserId',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.EmployeePosition, {
            foreignKey: 'employeePositionId',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.EmployeeType, {
            foreignKey: 'employeeTypeId',
            targetKey: 'id'
        });
    }

    //methods
    static getOne(where) {
        return this.findOne({
            where
        });
    }

    static getAll(where) {
        return this.findAll({
            where
        });
    }

    static getRecords(pagination, orderBy, where) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order: [orderBy],
            include: [
            { model: EmployeeType },
            { model: EmployeePosition },
            { model: generalMaster.VendorBasic },
            { model: generalMaster.Country },
            { model: customerMaster.Branch },
            { model: customerMaster.Company }
            ],
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
            include = [
                { model: EmployeeType },
                { model: EmployeePosition },
                { model: generalMaster.VendorBasic },
                { model: generalMaster.Country },
                { model: customerMaster.Branch },
                { model: customerMaster.Company }
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

    static addRecord(education) {
        return this.create(education, {
            returning: true
        });
    }

    static addNew(obj, transaction) {
        return this.create(
            obj
            , {
                returning: true,
                transaction: transaction
            });
    }

    static updateRecord(education, where) {
        // return  this.build(all, {isNewRecord: false}).save();
        return this.update(education, {
            where
        });
    }

    static deleteRecord(where) {
        return this.destroy({
            where: where
        });
    }

}
