var _ = require('lodash');
const mapping = require('./config/model.map');

class Functions {

    static async getData(dataArrays) {
        var promises = [];

        const likeArr = [];
        const pagination = {
            // limit: 999,
            // offset: 0,
        };
        const order = ["updatedAt", "desc"];
        _.forEach(dataArrays, (data) => {
            let foundMasterdata = _.find(mapping, (o, k) => { return o.name === data; });
            if (foundMasterdata) {
                let p;
                const model = require(foundMasterdata.modelPath);
                p = model.searchAll(likeArr, null, pagination, order, []).then((res) => {
                    return {
                        [data]: _.uniqBy(res.rows, 'id')
                    };
                });

                promises.push(p);
            }
        });

        if (promises.length > 0) {
            return Promise.all(promises);
        } else {
            console.log("Masterdata no found");
            return [];
        }
    }

    static async getDataByIds(dataArrays) {
        let returnList = [];
        let cacheDataArr = [];
        cacheDataArr.push(dataArrays[0].cacheKey);

        return this.getData(cacheDataArr).then((mdLists) => {

            let cacheKey = dataArrays[0].cacheKey;
            if (!_.isEmpty(mdLists)) {
                let rows = mdLists[0][cacheKey];

                let filtered = _.filter(rows, (res) => {
                    return _.includes(dataArrays[0].ids, res.id);
                });

                returnList = filtered;
            }

            return returnList;
        });
    }

    static async getDataByQuery(dataArrays) {

        const pagination = {
            // limit: 1999,
            // offset: 0,
        };
        const order = ["updatedAt", "desc"];

        var promises = [];

        _.forEach(dataArrays, (data) => {
            let filter = []
            const likeArr = [];
            let attributes = null;
            let skipInclude = false;
            if (data.search) {
                _.forEach(data.search, (searchObj) => {
                    _.forEach(searchObj.text, (likeArrItem) => {
                        likeArr.push({ colId: searchObj.colId, text: `%${likeArrItem}%` });
                    });
                })
            }
            if (data.filter) {
                filter = data.filter;
            }
            if (data.attributes) {
                attributes = data.attributes;
            }
            if (data.skipInclude) {
                skipInclude = data.skipInclude;
            }

            let foundMasterdata = _.find(mapping, (o, k) => { return o.name === data.cacheKey; });
            if (foundMasterdata) {
                let p;
                const model = require(foundMasterdata.modelPath);
                p = model.searchAll(likeArr, attributes, pagination, order, filter, skipInclude).then((res) => {
                    return {
                        [data.cacheKey]: _.uniqBy(res.rows, 'id')
                    };
                });

                promises.push(p);
            }

        })

        let returnList = {};

        if (promises.length > 0) {
            return Promise.all(promises).then((res) => {
                _.forEach(res, (r) => {
                    returnList = _.merge(returnList, r);
                });
                return returnList;
            });
        } else {
            console.log("Masterdata no found");
            return returnList;
        }

    }

}


module.exports = Functions;