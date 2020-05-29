const Sequelize = require("sequelize");
const schema = require('./schema');
var _ = require('lodash');

const tableName = "internal_users";
const modelName = "internal_users";
const Op = Sequelize.Op;
const Utils = require('../../../../utils/database.utils');

const InternalUsersTenants = require('../internal_users_tenants');
const Tags = require('../tags');
const Tenants = require('../tenants');
const EmployeeType = require('../employeeType');
const EmployeePosition = require('../employeePosition');

const customerMaster = require('../../../customerMaster');
const generalMaster = require('../../../generalMaster');
const listing = require('../../../../utils/listing');

// const ModelWithPublisher = require('@driveit/publisher-lib').ModelWithPublisher;
module.exports = class InternalUsers extends Sequelize.Model {

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
        this.myAssociation = this.hasMany(models.InternalUsersTenants, {
            foreignKey: 'internalUserId',
            sourceKey: 'id'
        }, {
            onDelete: 'CASCADE'
        });

        this.myAssociation = this.belongsTo(models.EmployeePosition, { foreignKey: 'employeePositionId' });
        this.myAssociation = this.belongsTo(models.EmployeeType, { foreignKey: 'employeeTypeId' });

        if (!_.isEmpty(generalMaster)) {
            this.myAssociation = this.hasOne(generalMaster.VendorBasic, {
                sourceKey: "vendorId",
                foreignKey: 'id',
            });

            this.myAssociation = this.hasOne(generalMaster.Country, {
                sourceKey: "countryId",
                foreignKey: 'id',

            });
        }

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
    }

    //methods
    static getId(where, whereUserTenant = undefined, whereTenant = undefined, whereTag = undefined) {
        return this.findOne({
            where,
            // subQuery:false,
            include: [{
                model: InternalUsersTenants,
                where: whereUserTenant,
                include: [{
                    model: Tenants,
                    // where: whereTenant,
                    include: [{
                        model: Tags,
                        // where: whereTag
                    }, { model: customerMaster.Branch },
                    { model: customerMaster.Company }]
                }, {
                    model: Tags,
                    // where: whereTag
                }]
            },
            { model: EmployeeType },
            { model: EmployeePosition },
            { model: generalMaster.VendorBasic },
            { model: generalMaster.Country },
            { model: customerMaster.Branch },
            { model: customerMaster.Company }]
        });
    }

    static getUser(where) {
        return this.findOne({
            where,
            // attributes: ["id", "userId", "email", "lastSignedInToken", "lastSignedIn"],
            order: [
                ["createdAt", "DESC"]
            ]
        });
    }

    static getAll(where) {
        return this.findAll({
            where,
            include: [{
                model: InternalUsersTenants,
                include: [{
                    model: Tenants
                }, {
                    model: Tags
                }]
            },
            { model: EmployeeType },
            { model: EmployeePosition }]
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
                {
                    model: InternalUsersTenants,
                    order: [orderBy],
                    // separate: true,/
                    include: [
                        {
                            model: Tenants,
                            include: [
                                { model: customerMaster.Branch }, // disable temporarily to fix authservice
                                { model: customerMaster.Company }
                            ]
                        },
                        { model: Tags },
                    ]
                },
                { model: EmployeeType },
                { model: EmployeePosition },
                { model: generalMaster.VendorBasic },
                { model: generalMaster.Country },
                { model: customerMaster.Branch }, // disable temporarily to fix authservice
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
        const customInclude = [
            {
                model: InternalUsersTenants,
                order: [orderBy],
                // separate: true,/
                include: [
                    {
                        model: Tenants,
                        include: [
                            { model: customerMaster.Branch },
                            { model: customerMaster.Company }
                        ]
                    },
                    { model: Tags },
                ]
            },
            { model: EmployeeType },
            { model: EmployeePosition },
            { model: generalMaster.VendorBasic },
            { model: generalMaster.Country },
            { model: customerMaster.Branch },
            { model: customerMaster.Company }
        ];
        
        return listing.getSearch({
            sequelizeModel: this,
            pagination,
            orderBy,
            where,
            include: include || customInclude
        });
    }

    static addUser(user, transaction) {
        return this.create(user, {
            returning: true,
            transaction: transaction
        });
    }

    static updateUser(user, where) {
        return this.update(user, {
            where,
        }).then((value) => {
            return this.getId(where);
        });
    }

    static deleteUser(where) {
        return this.destroy({
            where: where
        });
    }

    static getInternalUsers(pagination, orderBy, where) {

        return this.findAndCountAll({
            where,
            // distinct: false, 
            //subQuey true will have correct count but cant sort or filter or search
            //query false will have wrong count but can sort or filter or search
            subQuery: false, //adding this cause groupby issue, removing causing sorting and search and filter issue
            include: [{
                order: [orderBy],
                model: InternalUsersTenants,
                // separate: true,/
                include: [
                    {
                        model: Tenants,
                        include: [
                            { model: customerMaster.Branch },
                            { model: customerMaster.Company }
                        ]
                    },
                    { model: Tags },]
            },
            { model: EmployeeType },
            { model: EmployeePosition },
            { model: generalMaster.VendorBasic },
            { model: generalMaster.Country },
            { model: customerMaster.Branch },
            { model: customerMaster.Company }
            ],
            ...pagination,
            order: [orderBy],
        });
    }

    static getInternalUsersByGroup(pagination, orderBy, where) {

        return this.findAndCountAll({
            where,
            // distinct: false, 
            //subQuey true will have correct count but cant sort or filter or search
            //query false will have wrong count but can sort or filter or search
            subQuery: false, //adding this cause groupby issue, removing causing sorting and search and filter issue
            include: [
                {
                    model: InternalUsersTenants,
                    order: [orderBy],
                    // separate: true,/
                    include: [
                        {
                            model: Tenants,
                            include: [
                                { model: customerMaster.Branch },
                                { model: customerMaster.Company }
                            ]
                        },
                        { model: Tags },
                    ]
                },
                { model: EmployeeType },
                { model: EmployeePosition },
                { model: generalMaster.VendorBasic },
                { model: generalMaster.Country },
                { model: customerMaster.Branch },
                { model: customerMaster.Company }
            ],
            ...pagination,
            group: ['createdAt'],
            order: [orderBy],
        });
    }

    static getSystemUsers(pagination, orderBy) {

        return this.findAndCountAll({
            ...pagination,
            order: [orderBy]
        });
    }

    static getInvitedAndSystemUsers(pagination, orderBy, searches) {
        let ordering = orderBy[0] + " " + orderBy[1];
        let ifLimit = pagination.limit == 0 ? '' : 'LIMIT :offset, :count ';
        return this.sequelize.query(
            'SELECT * FROM (SELECT id, email, status, userMatrix as userMatrix, updatedBy, createdBy, updatedAt, createdAt FROM invited_users ' +
            'UNION ' +
            'SELECT id, email, status, null as userMatrix, updatedBy, createdBy, updatedAt, createdAt FROM internal_users) as a ' +
            Utils.generateWhereClause(searches) + ' ' +
            'ORDER BY ' + ordering + ' ' + //SEQUELIZE BUG FIX
            ifLimit, {
            replacements: {
                ordering: ordering,
                offset: pagination.offset,
                count: pagination.limit,
            },
            type: Sequelize.QueryTypes.SELECT
        }).then(rows => {
            return rows;
        })
    }

    static getInvitedAndSystemUsersCount() {
        return this.sequelize.query(
            'SELECT COUNT(*) as count FROM (SELECT id, email, status, userMatrix as userMatrix, updatedBy, createdBy, updatedAt, createdAt FROM invited_users ' +
            'UNION ' +
            'SELECT id, email, status, null as userMatrix, updatedBy, createdBy, updatedAt, createdAt FROM internal_users) as a ', {
            replacements: {

            },
            type: Sequelize.QueryTypes.SELECT
        }).then(rows => {
            return rows[0].count;
        })
    }

    static getUserAndCompanyName(email) {
        return this.sequelize.query(`SELECT internal_users.id,employees.fullName,internal_users_tenants.tagId,tags.name AS tagName,
        company.name AS companyName,branch.name AS branchName,internal_users.vendorId
                FROM auth.internal_users 
                LEFT JOIN auth.internal_users_tenants AS internal_users_tenants ON internal_users_tenants.internalUserId = internal_users.id
                LEFT JOIN auth.tenants AS tenants ON tenants.id = internal_users_tenants.tenantId
                LEFT JOIN auth.tags AS tags ON tags.id = internal_users_tenants.tagId
                LEFT JOIN auth.employees as employees ON employees.employeeId = internal_users.employeeId
                LEFT JOIN customer_master.company AS company ON company.id = employees.companyId
                LEFT JOIN customer_master.branch AS branch ON branch.id = employees.branchId
                WHERE internal_users.email = ? AND internal_users.deleted = 0`, {
            replacements: [email], type: this.sequelize.QueryTypes.SELECT
        })
    }

}