const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "technicianTeam";
const modelName = "technicianTeam";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const CustomerMaster = require('../../../customerMaster');
const Auth = require('../../../auth');

module.exports = class TechnicianTeam extends Sequelize.Model {

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
        if (!_.isEmpty(CustomerMaster)) {
            this.myAssociation = this.hasOne(CustomerMaster.Branch, {
                foreignKey: 'id',
                sourceKey: 'branchId'
            });
        }

        if (!_.isEmpty(Auth)) {
            this.myAssociation = this.hasOne(Auth.Employees, {
                foreignKey: 'id',
                sourceKey: 'foreman1Id',
                as: 'foreman1'
            });
            this.myAssociation = this.hasOne(Auth.Employees, {
                foreignKey: 'id',
                sourceKey: 'foreman2Id',
                as: 'foreman2'
            });
            this.myAssociation = this.hasOne(Auth.Employees, {
                foreignKey: 'id',
                sourceKey: 'foreman3Id',
                as: 'foreman3'
            });
        }
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
            order: [
                ["createdAt", "DESC"]
            ]
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
                {
                    model: CustomerMaster.Branch,
                    attributes: ["code", "name", [Sequelize.fn('CONCAT', Sequelize.col('branch.code'), ' - ', Sequelize.col('branch.name')), 'branchName']]
                },
                {
                    model: Auth.Employees,
                    as: "foreman1",
                    attributes: ["employeeId", "fullName", [Sequelize.fn('CONCAT', Sequelize.col('foreman1.employeeId'), ' - ', Sequelize.col('foreman1.fullName')), 'foremanName']]
                },
                {
                    model: Auth.Employees,
                    as: "foreman2",
                    attributes: ["employeeId", "fullName", [Sequelize.fn('CONCAT', Sequelize.col('foreman2.employeeId'), ' - ', Sequelize.col('foreman2.fullName')), 'foremanName']]
                },
                {
                    model: Auth.Employees,
                    as: "foreman3",
                    attributes: ["employeeId", "fullName", [Sequelize.fn('CONCAT', Sequelize.col('foreman3.employeeId'), ' - ', Sequelize.col('foreman3.fullName')), 'foremanName']]
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

    static addNew(obj, transaction) {
        return this.create(
            obj
            , {
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

    static deleteRecord(where, obj, transaction = null) {
        // return this.destroy({
        //     where: where
        // }, transaction);
        obj['deleted'] = true;
        return this.update(
            obj, {
            where
        });
    }

}
