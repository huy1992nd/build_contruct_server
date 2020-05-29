const { Client } = require('@elastic/elasticsearch')
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
const indexName = 'repair-order';
const docType = 'repairOrder';

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
                    // console.error(err);
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
                    "properties": {
                        "id": {
                            "type": "text"
                        },
                        "refNo": {
                            "type": "keyword",
                            "normalizer": "normalizer_uppercase"
                        },
                        "roPrintDate": {
                            "type": "date"
                        },
                        "proNumber": {
                            "type": "keyword",
                            "normalizer": "normalizer_uppercase"
                        },
                        "proStatus": {
                            "type": "keyword"
                        },
                        "appointmentsRefNo": {
                            "type": "keyword",
                            "normalizer": "normalizer_uppercase"
                        },
                        "status": {
                            "type": "text"
                        },
                        "appointmentsId": {
                            "type": "text"
                        },
                        "appointmentTypeId": {
                            "type": "text"
                        },
                        "mileageLast": {
                            "type": "text",
                            "index_options": "docs"
                        },
                        "mileageCurrent": {
                            "type": "text",
                            "index_options": "docs"
                        },
                        "createdAt": {
                            "type": "date"
                        },
                        "updatedAt": {
                            "type": "date"
                        },
                        "createdBy": {
                            "type": "text",
                            "index_options": "docs"
                        },
                        "updatedBy": {
                            "type": "text",
                            "index_options": "docs"
                        },
                        "roReleasedDate": {
                            "type": "date"
                        },
                        "arrivalTime": {
                            "type": "text"
                        },
                        "currencyId": {
                            "type": "text"
                        },
                        "remarks": {
                            "type": "text",
                            "index_options": "docs"
                        },
                        "customerTypeId": {
                            "type": "text"
                        },
                        "assignedSAId": {
                            "type": "text"
                        },
                        "saFullName": {
                            "type": "text",
                            "index_options": "docs"
                        },
                        "saEmployeeID": {
                            "type": "text"
                        },
                        "repairOrderTypeCode": {
                            "type": "text"
                        },
                        "repairOrderTypeName": {
                            "type": "text",
                            "index_options": "docs"
                        },
                        "repairOrderDate": {
                            "type": "date"
                        },
                        "repairOrderTime": {
                            "type": "text"
                        },
                        "vehicleRegNo": {
                            "type": "keyword",
                            "normalizer": "normalizer_uppercase"
                        },
                        "modelName": {
                            "type": "text",
                            "index_options": "docs"
                        },
                        "customerId": {
                            "type": "text"
                        },
                        "contactName": {
                            "type": "keyword",
                            "normalizer": "normalizer_uppercase"
                        },
                        "contactPersonTelephone": {
                            "type": "text",
                            "index_options": "docs"
                        },
                        "contactPersonMobile": {
                            "type": "text",
                            "index_options": "docs"
                        },
                        "contactPersonEmail": {
                            "type": "text",
                            "index_options": "docs"
                        },
                        "relationshipId": {
                            "type": "text"
                        },
                        "contactRelationship": {
                            "type": "text"
                        },
                        "customerNameIdno": {
                            "type": "text"
                        },
                        "customerAccGroupId": {
                            "type": "text"
                        },
                        "customerAccGroupName": {
                            "type": "text",
                            "index_options": "docs"
                        },
                        "customerName": {
                            "type": "keyword",
                            "normalizer": "normalizer_uppercase"
                        },
                        "contactPersonId": {
                            "type": "text"
                        },
                        "customerTel": {
                            "type": "keyword",
                            "index_options": "docs"
                        },
                        "customerMobile": {
                            "type": "text",
                            "index_options": "docs"
                        },
                        "identityNo": {
                            "type": "text"
                        },
                        "branchCodeName": {
                            "type": "text",
                            "index_options": "docs"
                        },
                        "branchId": {
                            "type": "text"
                        },
                        "branchCode": {
                            "type": "text"
                        },
                        "branchName": {
                            "type": "text",
                            "index_options": "docs"
                        },
                        "companyId": {
                            "type": "text"
                        },
                        "countryId": {
                            "type": "text"
                        },
                        "asName": {
                            "type": "text",
                            "index_options": "docs"
                        },
                        "roStatus": {
                            "type": "keyword"
                        },
                        "chassisNo": {
                            "type": "text"
                        },
                        "appointmentDate": {
                            "type": "date",
                            "format": "dd-MM-yyyy"
                        },
                        "appointmentTime": {
                            "type": "text"
                        },
                        "estimatedHours": {
                            "type": "text"
                        },
                        "waitingStatus": {
                            "type": "text"
                        },
                        "vehicleId": {
                            "type": "text"
                        },
                        "makeId": {
                            "type": "text"
                        },
                        "modelId": {
                            "type": "text"
                        },
                        "variantId": {
                            "type": "text"
                        },
                        "vehicleChassisNo": {
                            "type": "text"
                        },
                        "vehicleEngineNo": {
                            "type": "text"
                        },
                        "appointmentMethodId": {
                            "type": "text"
                        },
                        "repairOrderTypeId": {
                            "type": "text"
                        },
                        "variantCode": {
                            "type": "text",
                            "index_options": "docs"
                        },
                        "serviceModelCode": {
                            "type": "text",
                            "index_options": "docs"
                        },
                        "bodyTypeId": {
                            "type": "text"
                        },
                        "engineCode": {
                            "type": "text"
                        },
                        "appointmentTypeName": {
                            "type": "text",
                            "index_options": "docs"
                        },
                        "appointmentMethodName": {
                            "type": "text",
                            "index_options": "docs"
                        },
                        "vehicleRegistrationDate": {
                            "type": "text"
                        },
                        "currentBayLocationId": {
                            "type": "text"
                        },
                        "roTypeChargeType": {
                            "type": "text",
                            "index_options": "docs"
                        },
                        "repairOrderFlatRates": {
                            "type": "nested",
                            "properties": {
                                "id": {
                                    "type": "text"
                                },
                                "billTo": {
                                    "type": "text"
                                },
                                "hours": {
                                    "type": "text"
                                },
                                "discountAmount": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "discountPercent": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "taxAmount": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "unitAmount": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "amount": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "billToName": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "totalAmount": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "reassignedTechnicianId": {
                                    "type": "text"
                                },
                                "vendorId": {
                                    "type": "text"
                                },
                                "reassignedTechnicianName": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "chargeType": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "resolvedStatus": {
                                    "type": "integer"
                                },
                                "remark": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "warrantyIncidentId": {
                                    "type": "text"
                                },
                                "status": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "bayMasterId": {
                                    "type": "text"
                                },
                                "jobsId": {
                                    "type": "text"
                                },
                                "jobClassId": {
                                    "type": "text"
                                },
                                "jobTypeId": {
                                    "type": "text"
                                },
                                "servicePackageId": {
                                    "type": "text"
                                },
                                "jobId": {
                                    "type": "text"
                                },
                                "jobCode": {
                                    "type": "text"
                                },
                                "jobName": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "jobMaterialId": {
                                    "type": "text"
                                },
                                "jobPoGeneration": {
                                    "type": "text"
                                },
                                "jobJobGroupId": {
                                    "type": "text"
                                },
                                "jobJobClassId": {
                                    "type": "text"
                                },
                                "jobJobTypeId": {
                                    "type": "text"
                                },
                                "jobJobCatalogId": {
                                    "type": "text"
                                },
                                "jobServicePackageId": {
                                    "type": "text"
                                },
                                "jobClassQcbyforeman": {
                                    "type": "integer"
                                },
                                "jobClassCode": {
                                    "type": "text"
                                },
                                "jobClassName": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "jobTypeCode": {
                                    "type": "text"
                                },
                                "jobTypeName": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "costCenterId": {
                                    "type": "text",
                                },
                                "costCenterName": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "subletCodeId": {
                                    "type": "text"
                                },
                                "subletCodeName": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "materialDescription": {
                                    "type": "text"
                                },
                                "materialCode": {
                                    "type": "text"
                                },
                                "servicePackageCode": {
                                    "type": "text"
                                },
                                "servicePackageName": {
                                    "type": "text"
                                },
                                "servicePackageValidFrom": {
                                    "type": "date"
                                },
                                "servicePackageValidTo": {
                                    "type": "date"
                                },
                                "isSplit": {
                                    "type": "integer"
                                },
                                "repairOrderId": {
                                    "type": "text"
                                },
                                "deleted": {
                                    "type": "integer"
                                },
                                "recommendation": {
                                    "type": "boolean"
                                },
                                "createdAt": {
                                    "type": "date"
                                },

                                "servicePackageTypeId": {
                                    "type": "text"
                                },
                                "servicePackageTypeCode": {
                                    "type": "text"
                                },
                                "servicePackageTypeName": {
                                    "type": "text"
                                },
                                "materialTypeId": {
                                    "type": "text"
                                },
                                "materialTypeCode": {
                                    "type": "text"
                                },
                                "materialTypeName": {
                                    "type": "text"
                                },
                                "materialGroupId": {
                                    "type": "text"
                                },
                                "materialGroupCode": {
                                    "type": "text"
                                },
                                "materialGroupName": {
                                    "type": "text"
                                },
                                "makeId": {
                                    "type": "text"
                                },
                                "makeCode": {
                                    "type": "text"
                                },
                                "makeName": {
                                    "type": "text"
                                },
                                "uomId": {
                                    "type": "text"
                                },
                                "uomCode": {
                                    "type": "text"
                                },
                                "uomName": {
                                    "type": "text"
                                }
                            }
                        },
                        "repairOrderParts": {
                            "type": "nested",
                            "properties": {
                                "id": {
                                    "type": "text"
                                },
                                "workshopStocks": {
                                    "type": "text"
                                },
                                "quantity": {
                                    "type": "integer"
                                },
                                "billTo": {
                                    "type": "text"
                                },
                                "discountAmount": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "discountPercent": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "taxAmount": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "totalAmount": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "unitAmount": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "materialMasterId": {
                                    "type": "text"
                                },
                                "materialId": {
                                    "type": "text"
                                },
                                "amount": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "billToName": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "costCenterId": {
                                    "type": "text",
                                },
                                "costCenterName": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "chargeType": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "currencyId": {
                                    "type": "text"
                                },
                                "resolvedStatus": {
                                    "type": "integer"
                                },
                                "warrantyIncidentId": {
                                    "type": "text"
                                },
                                "status": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "repairOrderId": {
                                    "type": "text"
                                },
                                "jobsId": {
                                    "type": "text"
                                },
                                "servicePackageId": {
                                    "type": "text"
                                },
                                "jobId": {
                                    "type": "text"
                                },
                                "jobCode": {
                                    "type": "text"
                                },
                                "jobName": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "uomId": {
                                    "type": "text"
                                },
                                "uomCode": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "uomName": {
                                    "type": "text"
                                },
                                "makeId": {
                                    "type": "text"
                                },
                                "makeCode": {
                                    "type": "text"
                                },
                                "makeName": {
                                    "type": "text"
                                },
                                "servicePackageCode": {
                                    "type": "text"
                                },
                                "servicePackageName": {
                                    "type": "text"
                                },
                                "servicePackageValidFrom": {
                                    "type": "date"
                                },
                                "servicePackageValidTo": {
                                    "type": "date"
                                },
                                "servicePackageTypeId": {
                                    "type": "text"
                                },
                                "servicePackageTypeCode": {
                                    "type": "text"
                                },
                                "servicePackageTypeName": {
                                    "type": "text"
                                },
                                "materialTypeId": {
                                    "type": "text"
                                },
                                "materialTypeCode": {
                                    "type": "text"
                                },
                                "materialTypeName": {
                                    "type": "text"
                                },
                                "partCode": {
                                    "type": "text"
                                },
                                "partName": {
                                    "type": "text"
                                },
                                "partGroupId": {
                                    "type": "text"
                                },
                                "partGroupCode": {
                                    "type": "text"
                                },
                                "partGroupName": {
                                    "type": "text"
                                },
                                "deleted": {
                                    "type": "integer"
                                }
                            }
                        },
                        "repairOrderPackages": {
                            "type": "nested",
                            "properties": {
                                "id": {
                                    "type": "text"
                                },
                                "chargeType": {
                                    "type": "text"
                                },
                                "quantity": {
                                    "type": "integer"
                                },
                                "billTo": {
                                    "type": "text"
                                },
                                "billToName": {
                                    "type": "text"
                                },
                                "taxAmount": {
                                    "type": "text"
                                },
                                "totalAmount": {
                                    "type": "text"
                                },
                                "servicePackageId": {
                                    "type": "text"
                                },
                                "servicePackageCode": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "servicePackageName": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "companyId": {
                                    "type": "text"
                                },
                                "branchId": {
                                    "type": "text"
                                },
                                "makeId": {
                                    "type": "text"
                                },
                                "businessStreamId": {
                                    "type": "text"
                                },
                                "packageTypeId": {
                                    "type": "text"
                                },
                                "externalKey": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "mileageFrom": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "mileageTo": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "validFrom": {
                                    "type": "date",
                                    "index_options": "docs"
                                },
                                "validTo": {
                                    "type": "date",
                                    "index_options": "docs"
                                },
                                "currencyId": {
                                    "type": "text"
                                },
                                "currencyCode": {
                                    "type": "text"
                                },
                                "discountAmount": {
                                    "type": "text"
                                },
                                "changable": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "expressService": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "priceBy": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "totalLabour": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "totalParts": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "totalSublet": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "serviceTax": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "netPrice": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "status": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "repairOrderId": {
                                    "type": "text"
                                },
                                "deleted": {
                                    "type": "boolean"
                                }
                            }
                        },
                        "warrantyIncidents": {
                            "type": "nested",
                            "properties": {
                                "id": {
                                    "type": "text"
                                },
                                "warrantyIncidentNo": {
                                    "type": "text"
                                },
                                "warrantyClaimFormNo": {
                                    "type": "text"
                                },
                                "warrantyClaimStatusId": {
                                    "type": "text"
                                },
                                "warrantyProfileId": {
                                    "type": "text"
                                },
                                "warrantyExpiredDate": {
                                    "type": "date",
                                    "format": "dd-MM-yyyy"
                                },
                                "warrantyClaimTypeId": {
                                    "type": "text"
                                },
                                "warrantyCategoryId": {
                                    "type": "text"
                                },
                                "warrantyClaimCategoryId": {
                                    "type": "text"
                                },
                                "warrantyAppovalNumber": {
                                    "type": "text"
                                },
                                "defectMaterialId": {
                                    "type": "text"
                                },
                                "symptomCategoryId": {
                                    "type": "text"
                                },
                                "symptomCodeId": {
                                    "type": "text"
                                },
                                "troubleCodeId": {
                                    "type": "text"
                                },
                                "warrantyClassCodeId": {
                                    "type": "text"
                                },
                                "sourceofProblemId": {
                                    "type": "text"
                                },
                                "pNCCodeId": {
                                    "type": "text"
                                },
                                "problem": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "cause": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "rectification": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "remarksNSDOfficer": {
                                    "type": "text"
                                },
                                "totalLabour": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "totalPart": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "taxAmount": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "totalAmount": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "status": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "partsPurchaseInvoiceNo": {
                                    "type": "text"
                                },
                                "warrantySymptomCategoryId": {
                                    "type": "text"
                                },
                                "warrantyCategoryName": {
                                    "type": "text"
                                },
                                "warrantyCategoryCode": {
                                    "type": "text"
                                },
                                "warrantyClaimTypeName": {
                                    "type": "text"
                                },
                                "warrantyClaimTypeCode": {
                                    "type": "text"
                                },
                                "warrantyClaimCategoryName": {
                                    "type": "text"
                                },
                                "warrantyClaimCategoryCode": {
                                    "type": "text"
                                },
                                "warrantyBillToName": {
                                    "type": "text"
                                },
                                "warrantyBillToId": {
                                    "type": "text"
                                },
                                "createdBy": {
                                    "type": "text"
                                },
                                "createdByName": {
                                    "type": "text"
                                },
                                "createdAt": {
                                    "type": "date"
                                },
                                "fileName": {
                                    "type": "text"
                                },
                                "fileUrl": {
                                    "type": "text"
                                },
                                "uploadDate": {
                                    "type": "text"
                                },
                                "uploadBy": {
                                    "type": "text"
                                },
                                "type": {
                                    "type": "text"
                                },
                                "recallInternalNo": {
                                    "type": "text"
                                }
                            }
                        },
                        "repairOrderInsurance": {
                            "properties": {
                                "id": {
                                    "type": "text"
                                },
                                "companyCode": {
                                    "type": "text"
                                },
                                "underinsuredAmountWaiver": {
                                    "type": "text",
                                },
                                "bettermentAmountWaiver": {
                                    "type": "text",
                                },
                                "accessAmountWaiver": {
                                    "type": "text",
                                },
                                "companyName": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "approvalNumber": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "vehicleAccidentDate": {
                                    "type": "text"
                                },
                                "approvalAmount": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "totalLabour": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "totalPart": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "tax": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "processingFees": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "towingCharges": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "totalAmount": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "payableAmount": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "underinsuredAmount": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "bettermentAmount": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "accessAmount": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "customerPayableTax": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "introducerCode": {
                                    "type": "text"
                                },
                                "introducerId": {
                                    "type": "text"
                                },
                                "introducerName": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "introducerContactNumber": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "introducerCommission": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "status": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "accessAmountWaiver": {
                                    "type": "text",
                                },
                                "bettermentAmountWaiver": {
                                    "type": "text",
                                },
                                "underinsuredAmountWaiver": {
                                    "type": "text",
                                }
                            }
                        },
                        "uploadAttachments": {
                            "type": "nested",
                            "properties": {
                                "id": {
                                    "type": "text"
                                },
                                "fileName": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "fileURL": {
                                    "type": "text",
                                    "index_options": "docs"
                                }
                            }
                        },
                        "purchaseOrders": {
                            "type": "nested",
                            "properties": {
                                "id": {
                                    "type": "text"
                                },
                                "poDate": {
                                    "type": "date",
                                    "format": "dd-MM-yyyy"
                                },
                                "poType": {
                                    "type": "text"
                                },
                                "poNumber": {
                                    "type": "text"
                                },
                                "status": {
                                    "type": "text"
                                },
                                "vendorBasicId": {
                                    "type": "text"
                                },
                                "vendorName": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "supplierAddress": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "supplierPhone": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "companyId": {
                                    "type": "text"
                                },
                                "billingAddress": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "billingPhone": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "roNumber": {
                                    "type": "text"
                                },
                                "roDate": {
                                    "type": "date",
                                    "format": "dd-MM-yyyy"
                                },
                                "pocustomerName": {
                                    "type": "text",
                                    "index_options": "docs"
                                },
                                "roId": {
                                    "type": "text"
                                },
                                "poItems": {
                                    "type": "nested",
                                    "properties": {
                                        "id": {
                                            "type": "text"
                                        },
                                        "code": {
                                            "type": "text"
                                        },
                                        "description": {
                                            "type": "text",
                                            "index_options": "docs"
                                        },
                                        "quantity": {
                                            "type": "text",
                                            "index_options": "docs"
                                        },
                                        "unitCost": {
                                            "type": "text",
                                            "index_options": "docs"
                                        },
                                        "unitSellingPrice": {
                                            "type": "text",
                                            "index_options": "docs"
                                        },
                                        "totalSellingPrice": {
                                            "type": "text",
                                            "index_options": "docs"
                                        },
                                        "totalCost": {
                                            "type": "text",
                                            "index_options": "docs"
                                        },
                                        "supplierInvoiceNo": {
                                            "type": "text"
                                        },
                                        "supplierInvoiceDate": {
                                            "type": "date",
                                            "format": "dd-MM-yyyy"
                                        },
                                        "supplierInvoiceUpdate": {
                                            "type": "text"
                                        },
                                        "deliveryOrderNo": {
                                            "type": "text"
                                        },
                                        "deliveryTo": {
                                            "type": "text"
                                        },
                                        "deliveryAddress": {
                                            "type": "text",
                                            "index_options": "docs"
                                        },
                                        "itemCategory": {
                                            "type": "text",
                                            "index_options": "docs"
                                        },
                                        "relatedJobs": {
                                            "type": "text",
                                            "index_options": "docs"
                                        },
                                        "status": {
                                            "type": "text",
                                            "index_options": "docs"
                                        },
                                        "remark": {
                                            "type": "text",
                                            "index_options": "docs"
                                        },
                                        "purchaseOrderId": {
                                            "type": "text"
                                        }
                                    }
                                }
                            }
                        },
                        "roRemarks": {
                            "type": "nested",
                            "properties": {
                                "id": {
                                    "type": "text"
                                },
                                "symptomCode": {
                                    "type": "text"
                                },
                                "remarks": {
                                    "type": "text"
                                },
                                "cBj": {
                                    "type": "text"
                                },
                                "jobName": {
                                    "type": "text"
                                },
                                "jobId": {
                                    "type": "text"
                                },
                                "vehicleRegNo": {
                                    "type": "text"
                                },
                                "repairOrderId": {
                                    "type": "text"
                                },
                                "currentMileage": {
                                    "type": "text"
                                }
                            }
                        },
                        "hasCarWash": {
                            "type": "integer"
                        },
                        "carWashAmount": {
                            "type": "text"
                        },
                        "clockInAction": {
                            "type": "text"
                        },
                        "isAfterQc_Passed": {
                            "type": "integer"
                        },
                        "updatedByName": {
                            "type": "text"
                        },
                        "createdByName": {
                            "type": "text"
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