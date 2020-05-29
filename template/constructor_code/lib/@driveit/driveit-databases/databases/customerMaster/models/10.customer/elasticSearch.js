const {
    Client
} = require('@elastic/elasticsearch')
const client = new Client({
    node: process.env.ES_URL || 'https://35.247.168.95:9200',
    auth: {
        username: process.env.ES_USERNAME || 'elastic',
        password: process.env.ES_PASSWORD || 'pcsdv9jnr7k9c5pr4h8j7528'
    },
    ssl: {
        rejectUnauthorized: false
    }
})
// client.ping({
//     RequestTimeoutError: 30000,
// }, function(error) {
//     if (error) {
//         console.error('elasticsearch cluster is down!');
//         throw error;
//     } else {
//         console.log('elasticsearch is ok');
//     }
// });
const indexName = 'customer-master';
const docType = 'customerMaster';

const self = module.exports = {
    createTableOrIndex: () => {
        return new Promise(resolve => {
            client.indices.create({
                index: indexName,
                body: {
                    "settings": {
                        "analysis": {
                            "normalizer": {
                                "normalizer_lowercase": {
                                    "type": "custom",
                                    "char_filter": [],
                                    "filter": ["lowercase", "asciifolding"]
                                },
                                "normalizer_uppercase": {
                                    "type": "custom",
                                    "char_filter": [],
                                    "filter": ["uppercase", "asciifolding"]
                                }
                            }
                        }
                    }
                }
            }, function (err, resp, status) {
                if (err) {
                    // console.error('err', err);
                    if (err.body.error.type == "resource_already_exists_exception") {
                        self.putMapping_new().catch(err => {
                            console.error(err)
                        });
                    }
                } else {
                    console.log("created indices", resp);
                    self.putMapping_new().catch(err => {
                        console.error(err)
                    });
                }
                resolve(true);
            });
        })
    },
    /**
     * To Create Mapping (Data type) in indexName index or table
     */
    putMapping_new: () => {
        return new Promise(resolve => {
            client.indices.putMapping({
                index: indexName,
                body: {
                    properties: {
                        id: {
                            type: "keyword"
                        },
                        countryId: {
                            type: "text"
                        },
                        customerAccountGroupId: {
                            type: "text"
                        },
                        regionId: {
                            type: "text"
                        },
                        salutationId: {
                            type: "text"
                        },
                        name: {
                            type: "keyword",
                            "normalizer": "normalizer_uppercase"
                        },
                        identityId: {
                            type: "text"
                        },
                        identityNo: {
                            type: "keyword"
                        },
                        status: {
                            type: "keyword"
                        },
                        deleted: {
                            type: "text"
                        },
                        inactivateReason: {
                            type: "text"
                        },
                        createdBy: {
                            type: "text"
                        },
                        updatedBy: {
                            type: "text"
                        },
                        mareaOperatorCode: {
                            type: "text"
                        },
                        fareaOperatorCode: {
                            type: "text"
                        },
                        tareaOperatorCode: {
                            type: "text"
                        },
                        createdAt: {
                            type: "date"
                        },
                        updatedAt: {
                            type: "date"
                        },
                        countryName: {
                            type: "keyword"
                        },
                        regionName: {
                            type: "keyword"
                        },
                        identityName: {
                            type: "keyword"
                        },
                        customerAccountGroupName: {
                            type: "keyword"
                        },
                        customerAccountGroup: {
                            properties: {
                                code: {
                                    type: "keyword"
                                },
                                name: {
                                    type: "keyword"
                                },
                                status: {
                                    type: "keyword"
                                },
                                deleted: {
                                    type: "text"
                                },
                                topicCode: {
                                    type: "keyword"
                                },
                                countryId: {
                                    type: "text"
                                }
                            }
                        },
                        customerDetails: {
                            type: "nested",
                            properties: {
                                id: {
                                    type: "keyword"
                                },
                                tenantId: {
                                    type: "text"
                                },
                                mAddress1: {
                                    type: "text"
                                },
                                mAddress2: {
                                    type: "text"
                                },
                                mAddress3: {
                                    type: "text"
                                },
                                mPostcodeId: {
                                    type: "text"
                                },
                                mCityId: {
                                    type: "text"
                                },
                                mStateId: {
                                    type: "text"
                                },
                                mCountryId: {
                                    type: "text"
                                },
                                cAddress1: {
                                    type: "text"
                                },
                                cAddress2: {
                                    type: "text"
                                },
                                cAddress3: {
                                    type: "text"
                                },
                                cPostcodeId: {
                                    type: "text"
                                },
                                cCityId: {
                                    type: "text"
                                },
                                cStateId: {
                                    type: "text"
                                },
                                cCountryId: {
                                    type: "text"
                                },
                                sameAddress: {
                                    type: "text"
                                },
                                telephone: {
                                    type: "text"
                                },
                                fax: {
                                    type: "text"
                                },
                                mobile: {
                                    type: "text"
                                },
                                email: {
                                    type: "text"
                                },
                                preferedModeOfContactId: {
                                    type: "text"
                                },
                                receiveSMS: {
                                    type: "text"
                                },
                                gender: {
                                    type: "text"
                                },
                                highestEducationId: {
                                    type: "text"
                                },
                                occupationId: {
                                    type: "text"
                                },
                                employmentSectorId: {
                                    type: "text"
                                },
                                industryId: {
                                    type: "text"
                                },
                                annualIncomeId: {
                                    type: "text"
                                },
                                ethnicityId: {
                                    type: "text"
                                },
                                dateOfBirth: {
                                    type: "text"
                                },
                                nationality: {
                                    type: "text"
                                },
                                maritalStatus: {
                                    type: "text"
                                },
                                religionId: {
                                    type: "text"
                                },
                                pdpaClause: {
                                    type: "text"
                                },
                                pdpaConsent: {
                                    type: "text"
                                },
                                pdpaSignedDate: {
                                    type: "text"
                                },
                                status: {
                                    type: "text"
                                },
                                deleted: {
                                    type: "text"
                                },
                                inactivateReason: {
                                    type: "text"
                                },
                                createdBy: {
                                    type: "text"
                                },
                                updatedBy: {
                                    type: "text"
                                },
                                createdAt: {
                                    type: "text"
                                },
                                updatedAt: {
                                    type: "text"
                                },
                                customerId: {
                                    type: "text"
                                },
                                customerGroupId: {
                                    type: "text"
                                },
                                customerFinances: {
                                    type: "nested",
                                    properties: {
                                        id: {
                                            type: "keyword"
                                        },
                                        customerId: {
                                            type: "text"
                                        },
                                        tenantId: {
                                            type: "text"
                                        },
                                        companyId: {
                                            type: "text"
                                        },
                                        customerGroupId: {
                                            type: "text"
                                        },
                                        paymentTermsId: {
                                            type: "text"
                                        },
                                        currencyId: {
                                            type: "text"
                                        },
                                        creditLimit: {
                                            type: "text"
                                        },
                                        blockOptionsIds: {
                                            type: "text"
                                        },
                                        taxClassId: {
                                            type: "text"
                                        },
                                        vatNumber: {
                                            type: "text"
                                        },
                                        status: {
                                            type: "keyword"
                                        },
                                        customerDetailsId: {
                                            type: "text"
                                        },
                                    }
                                },
                                customerContacts: {
                                    type: "nested",
                                    properties: {
                                        id: {
                                            type: "keyword"
                                        },
                                        customerId: {
                                            type: "text"
                                        },
                                        tenantId: {
                                            type: "text"
                                        },
                                        salutationId: {
                                            type: "text"
                                        },
                                        name: {
                                            type: "text"
                                        },
                                        telephone: {
                                            type: "text"
                                        },
                                        fax: {
                                            type: "text"
                                        },
                                        mobile: {
                                            type: "text"
                                        },
                                        email: {
                                            type: "text"
                                        },
                                        status: {
                                            type: "text"
                                        },
                                        deleted: {
                                            type: "text"
                                        },
                                        inactivateReason: {
                                            type: "text"
                                        },
                                        createdBy: {
                                            type: "text"
                                        },
                                        updatedBy: {
                                            type: "text"
                                        },
                                        mareaOperatorCode: {
                                            type: "text"
                                        },
                                        fareaOperatorCode: {
                                            type: "text"
                                        },
                                        tareaOperatorCode: {
                                            type: "text"
                                        },
                                        createdAt: {
                                            type: "text"
                                        },
                                        updatedAt: {
                                            type: "text"
                                        },
                                        customerDetailsId: {
                                            type: "text"
                                        },
                                        relationshipId: {
                                            type: "text"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, function (err, response) {
                if (err) {
                    console.error(err);
                    resolve();
                } else {
                    client.indices.getMapping({
                            index: indexName
                        },
                        function (error, response) {
                            if (error) {
                                console.error(error.message);
                                resolve();
                            } else {
                                console.log("Mappings successfully");
                                resolve();
                            }
                        });
                }
            })
        })
    },
    /**
     * Method to delete user table or index
     */
    deleteUserTableOrIndex: () => {
        return new Promise(resolve => {
            client.indices.delete({
                index: indexName
            }, function (err, resp, status) {
                console.log("delete", resp);
                resolve();
            });
        })
    },

    /**
     * Store the repair order data in the Index
     */
    pumpDatainES: () => {

        // client.create({
        //     id: string,
        //     index: indexName,
        //     type: docType,
        //     //wait_for_active_shards: string,
        //     refresh: 'true',// | 'false' | 'wait_for',
        //     //routing: string,
        //     //timeout: string,
        //     //version: number,
        //     //version_type: 'internal' | 'external' | 'external_gte' | 'force',
        //     //pipeline: string,
        //     body: object
        //   })
    }
}