'use strict'

require('array.prototype.flatmap').shim()
const User = require('../auth').InternalUsers;
const { Client } = require('@elastic/elasticsearch');

const client = new Client({
    node: 'https://35.247.168.95:9200',
    auth: {
        username: process.env.ES_USERNAME || 'elastic',
        password: process.env.ES_PASSWORD || 'pcsdv9jnr7k9c5pr4h8j7528'
    },
    ssl: {
        rejectUnauthorized: false
    }
});
exports.getInformUserById = (id) =>{
    const where = {id}
    let user = User.getId(where)
    return user;
}

function removeDateTimeIndocument(data) {
    if(data.id){
        data._id = data.id;
        delete data.id;
    }
    if(data.status){
        data._status = data.status;
        delete data.status;
    }
    if (data.createdAt) {
        delete data.createdAt;
    }
    if (data.updatedAt) {
        delete data.updatedAt;
    }
    return data;
}
exports.audit_log = async (dataset) => {
    if (dataset.length > 0) {
        dataset.forEach(ds => {
            if (ds.data) {
                if (ds.data.length > 0) {
                    ds.data.forEach(dt => {
                        dt = removeDateTimeIndocument(dt);
                    });
                }else{
                    ds.data = removeDateTimeIndocument(ds.data);
                }

            }
        });
    }
    const body = dataset.flatMap(doc => [{ index: { _index: 'auditlog-driveit' } }, doc])
    try {
        const { body: bulkResponse } = await client.bulk({ refresh: true, body })
        console.log(bulkResponse.errors);
        if (bulkResponse.errors) {
            const erroredDocuments = []
            bulkResponse.items.forEach((action, i) => {
                const operation = Object.keys(action)[0]
                if (action[operation].error) {
                    erroredDocuments.push({
                        status: action[operation].status,
                        error: action[operation].error,
                        operation: body[i * 2],
                        document: body[i * 2 + 1]
                    })
                }
            })
            console.log(erroredDocuments)
        }

        const { body: count } = await client.count({ index: 'auditlog-driveit' })
        console.log(count)
    } catch (ex) {
        console.log(ex);
    }
}