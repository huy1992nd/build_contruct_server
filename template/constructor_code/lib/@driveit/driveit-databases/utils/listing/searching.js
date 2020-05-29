const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const _ = require('lodash');
const Utils = require('../database.utils');

module.exports = {
    commonSearch: function (sequelizeModel, page, limit, order, searches, filter, basicSearch = false, include) {
        let where = {
            deleted: {
                [Op.or]: [false, null]
            }
        }; //for filtering deleted

        const andFilter = Utils.filterGenerator(filter);
        if (andFilter.length > 0) {
            _.forEach(andFilter, (val) => {
                _.forEach(val, (v, k) => {
                    where[k] = v;
                });
            });
        }

        const orSearch = Utils.searchGeneratorV2(searches);
        if (orSearch && orSearch.length) {
            where = {
                ...where,
                [Op.or]: orSearch
            };
        }

        const pagination = {
            limit,
            offset: limit ? limit * (page - 1) : undefined,
        }

        return module.exports.getSearch({
            sequelizeModel,
            pagination,
            where,
            orderBy: order,
            include: basicSearch ? [] : include,
        });
    },

    getSearch: function ({
        sequelizeModel,
        pagination,
        where,
        orderBy,
        attributes,
        include
    }) {

        return module.exports.getByGroup({
            sequelizeModel,
            pagination,
            where,
            orderBy,
            include
        }).then((records) => {
            recordIds = records.rows.map(eachRow => eachRow.id);
            return {
                recordIds,
                count: records.count.length
            };
        }).then((groupRecords) => {
            //get all data 
            return sequelizeModel.findAll({
                ...(attributes && {
                    attributes
                }),
                where: {
                    id: groupRecords.recordIds
                },
                // order: [[Sequelize.fn('FIELD', Sequelize.col(orderBy), 'BO0000000329', 'BO0000000327')]],
                // ...(!_.isEmpty(groupRecords.recordIds) && {
                //     order: [
                //         [Sequelize.fn('FIELD', Sequelize.col(sequelizeModel.tableName + '.id'), ...groupRecords.recordIds)]
                //     ]
                // }),
                ...(include && {
                    include
                }),
            }).then((records) => {
                //ordering
                return records.sort(function (a, b) {
                    return groupRecords.recordIds.indexOf(a.id) - groupRecords.recordIds.indexOf(b.id);
                });

            }).then((records) => {
                return {
                    rows: records,
                    count: groupRecords.count,
                }
            })
        })
    },
    getByGroup: function ({
        sequelizeModel,
        pagination,
        where,
        orderBy,
        include,
        groupBy = 'id'
    }) {
        where = {
            ...where
            // [Op.and]: isNotDeleted
        };
        // console.log("...orderBy.columnName.replace(/\[0\]/g, '').split('.'): ", ...orderBy.columnName.replace(/\[0\]/g, '').split('.'))
        return sequelizeModel.findAndCountAll({
            attributes: [groupBy],
            joinTableAttributes: [],
            ...(pagination && {
                ...pagination
            }),
            ...(include && {
                include
            }),
            ...(where && {
                where
            }),
            ...(orderBy && {
                order: [
                    Sequelize.fn('isnull', Sequelize.col((orderBy.columnName.includes(".") ? '' : (sequelizeModel.tableName + '.')) + orderBy.columnName.replace(/\[0\]/g, ''))),
                    [...orderBy.columnName.replace(/\[0\]/g, '').split('.'), orderBy.direction]
                ]
            }),
            ...(groupBy && {
                group: [groupBy]
            }),

            subQuery: false,
        });
    },
}