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
const indexName = 'vehicle-master';
const docType = 'vehicleMaster';

const self = module.exports = {
    createTableOrIndex: () => {
        return new Promise(resolve => {
            client.indices.create({
                index: indexName
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
                        id: {  type: "keyword"},
                        engineNo: {  type: "keyword"},
                        regNo: {  type: "keyword"},
                        chassisNo: {  type: "keyword"},
                        lastMileage: {  type: "text"},
                        prevMileage: {  type: "text"},
                        lastEngineHour: {  type: "text"},
                        prevEngineHour: {  type: "text"},
                        accuMileage: {  type: "text"},
                        accuEngineHour: {  type: "text"},
                        billingAccuMileage: {  type: "text"},
                        billingAccuEngineHour: {  type: "text"},
                        principleModelId: {  type: "text"},
                        yearMake: {  type: "text"},
                        releaseDate: {  type: "text"},
                        referenceDate: {  type: "text"},
                        productId: {  type: "text"},
                        packageId: {  type: "text"},
                        exciseDuty: {  type: "text"},
                        exciseNo: {  type: "text"},
                        salesTax: {  type: "text"},
                        indentNo: {  type: "text"},
                        plantModelCode: {  type: "text"},
                        vehicleStatus: {  type: "keyword"},
                        streamSource: {  type: "text"},
                        remark: {  type: "text", index_options: "docs"},
                        branchId: {  type: "text"},
                        companyId: {  type: "text"},
                        divisionId: {  type: "text"},
                        countryId: {  type: "text"},
                        assemblyTypeId: {  type: "text"},
                        salesBranchId: {  type: "text"},
                        manufacturingDate: {  type: "text"},
                        vehicleLocationId: {  type: "text"},
                        vehicleStockId: {  type: "text"},
                        storageLocationId: {  type: "text"},
                        optionalPackageIds: {  type: "text"},
                        optionalItemIds: {  type: "text"},
                        exciseTypeId: {  type: "text"},
                        vdcStatus: {  type: "keyword" },
                        inactivateReason: {  type: "text", index_options: "docs"},
                        releaseDateTime: {  type: "date"},
                        allocateDateTime: {  type: "date"},
                        assignDateTime: {  type: "date"},
                        registrationDate: {  type: "date" },
                        rfIdNo: {  type: "text"},
                        rfIdRegisterDate: {  type: "date"},
                        status: {  type: "text"},
                        deleted: {  type: "text"},
                        createdBy: {  type: "text", index_options: "docs"},
                        updatedBy: {  type: "text", index_options: "docs"},
                        createdAt: {  type: "date"},
                        updatedAt: {  type: "date"},
                        makeId: {  type: "text"},
                        modelId: {  type: "text"},
                        variantId: {  type: "text"},
                        variant: {  properties: {
                            assemblyTypeId	: {  type: "text"},
                            bodyTypeId	: {  type: "text"},
                            carryingCapacity	: {  type: "text"},
                            cc	: {  type: "text"},
                            code : {  type: "text"},
                            createdAt	: {  type: "text"},
                            createdBy	: {  type: "text"},
                            deleted : { type: "boolean" },
                            doors : {  type: "text"},
                            engineCapacity: {  type: "text"},
                            engineCode: {  type: "text"},
                            engineTypeId: {  type: "text"},
                            exciseDutyBranchId: {  type: "text"},
                            exciseFreeDutyBranchId: {  type: "text"},
                            id: {  type: "text"},
                            inactivateReason	: {  type: "text"},
                            jpgCompanyId	: {  type: "text"},
                            jpgModel	: {  type: "text"},
                            makeId	: {  type: "text"},
                            modelId	: {  type: "text"},
                            modelYear : {  type: "text"},
                            name : {  type: "text"},
                            originalStatusId : {  type: "text"},
                            plantCode : {  type: "text"},
                            principleModelCode : {  type: "text"},
                            productItemIds : {  type: "text"},
                            seatingCapacity : {  type: "text"},
                            serviceModelCode : {  type: "text"},
                            status : {  type: "text"},
                            targetEffectiveEndDate: {  type: "text"},
                            targetEffectiveStartDate: {  type: "text"},
                            transmissionTypeId: {  type: "text"},
                            updatedAt	: {  type: "text"},
                            updatedBy	: {  type: "text"},
                            vehicleTypeId : {  type: "text"},
                            vehicleUsageId : {  type: "text"},
                            vtaApprovalDate : {  type: "text"},
                            vtaSerialNo : {  type: "text"},
                            warrantyItemIds : {  type: "text"},
                            wheelBase : {  type: "text"},
                            wheelDriveId : {  type: "text"}
                        }},
                        colorId: {  type: "text"},
                        colorTypeId: {  type: "text"},
                        vehicleBusinessTypeId: {  type: "text"},
                        color: {  properties: {
                            id	: {  type: "text"},
                            code	: {  type: "text"},
                            name	: {  type: "text"},
                            colorTypeId	: {  type: "text"},
                            deleted : { type: "boolean" },
                            inactivateReason	: {  type: "text"},
                            jpjColorId	: {  type: "text"},
                            manufactureCode : {  type: "text"},
                            status : {  type: "text"},
                            updatedAt	: {  type: "text"},
                            createdAt	: {  type: "text"},
                            updatedBy	: {  type: "text"},
                            createdBy	: {  type: "text"},
                        }},
                        make: {  properties: {
                            id	: {  type: "text"},
                            code	: {  type: "text"},
                            name	: {  type: "text"},
                            deleted : { type: "boolean" },
                            inactivateReason	: {  type: "text"},
                            jpjmakeId	: {  type: "text"},
                            status : {  type: "text"},
                            updatedAt	: {  type: "text"},
                            createdAt	: {  type: "text"},
                            updatedBy	: {  type: "text"},
                            createdBy	: {  type: "text"},
                        }},
                        model: {  properties: {
                            id	: {  type: "text"},
                            code	: {  type: "text"},
                            name	: {  type: "text"},
                            deleted : { type: "boolean" },
                            inactivateReason	: {  type: "text"},
                            makeId	: {  type: "text"},
                            status : {  type: "text"},
                            updatedAt	: {  type: "text"},
                            createdAt	: {  type: "text"},
                            updatedBy	: {  type: "text"},
                            createdBy	: {  type: "text"},
                        }},
                        vehicleBusinessType: {  properties: {
                            id	: {  type: "text"},
                            code	: {  type: "text"},
                            name	: {  type: "text"},
                            status	: {  type: "text"},
                            createdAt	: {  type: "text"},
                            createdBy	: {  type: "text"},
                            deleted	: {  type: "boolean"},
                            inactivateReason : {  type: "text"},
                            updatedAt	: {  type: "text"},
                            updatedBy	: {  type: "text"}
                        }},
                        makeName: {  type: "text"},
                        modelName: {  type: "text"},
                        variantName: {  type: "text"},
                        colorName: {  type: "text"},
                        totalOic: {  type: "text", index_options: "docs"},
                        productName: {  type: "text"},
                        vehicleStock: {
                            properties: {
                                id	: { type: "text" },
                                code	: { type: "text" },
                                name	: { type: "text" },
                                status	: { type: "text" },
                                deleted	: { type: "text" },
                                languageId	: { type: "text" },
                                timezoneId	: { type: "text" },
                                postcodeId	: { type: "text" },
                                countryId	: { type: "text" },
                                cityId	: { type: "text" },
                                stateId	: { type: "text" },
                                currencyId	: { type: "text" },
                                address1	: { type: "text" },
                                address2	: { type: "text" },
                                address3	: { type: "text" },
                                callCenterName : { type: "text" },
                                callCenterNo : { type: "text" },
                                email	: { type: "text" },
                                telephone	: { type: "text" },
                                telCode	: { type: "text" },
                                fax	: { type: "text" },
                                faxCode : { type: "text" },
                                zone	: { type: "text" },
                                area	: { type: "text" },
                                regionId	: { type: "text" },
                                taxId	: { type: "text" },
                                taxRegistrationDate	: { type: "text" },
                                taxZone	: { type: "text" },
                                taxClassification	: { type: "text" },
                                companyRegistrationNo	: { type: "text" },
                                createdAt	: { type: "text" },
                                createdBy: {  type: "text" },
                                updatedAt	: { type: "text" },
                                updatedBy: {  type: "text" },
                                inactivateReason : { type: "text" },
                                parentCompanyId	: { type: "text" },
                                dealerGroupId	: { type: "text" },
                                makeIds	: { type: "text" },
                                branchIds	: { type: "text" },
                                website	: { type: "text" },
                                calendarIndicators: { 
                                    type: "nested",
                                    properties: {
                                        id: { type: "text" },
                                        colorName: { type: "text" },
                                        min: { type: "text" },
                                        max: { type: "text" },
                                        // companyId: { type: "text" },
                                        // status: { type: "text" },
                                        // deleted: { type: "text", index_options: "docs" },
                                        // createdBy: { type: "text", index_options: "docs" },
                                        // updatedBy: { type: "text", index_options: "docs" },
                                        // createdAt: { type: "date" },
                                        // updatedAt: { type: "date" }
                                    }
                                }
                            }
                        },
                        vehicleLocation: {      // branch table
                            properties: {
                                id	: { type: "text" },
                                code	: { type: "text" },
                                name	: { type: "text" },
                                countryId	: { type: "text" },
                                companyRegistrationNo	: { type: "text" },
                                status	: { type: "text" },
                                address1	: { type: "text" },
                                address2	: { type: "text" },
                                address3	: { type: "text" },
                                postcodeId	: { type: "text" },
                                cityId	: { type: "text" },
                                stateId	: { type: "text" },
                                currencyId	: { type: "text" },
                                email	: { type: "text" },
                                telephone	: { type: "text" },
                                telCode	: { type: "text" },
                                fax	: { type: "text" },
                                faxCode : { type: "text" },
                                zone	: { type: "text" },
                                area	: { type: "text" },
                                regionId	: { type: "text" },
                                regionName	: { type: "text" },
                                taxId	: { type: "text" },
                                taxRegistrationDate	: { type: "text" },
                                taxZone	: { type: "text" },
                                deleted	: { type: "boolean" },
                                eChecklist : { type: "boolean" },
                                eDisposal : { type: "boolean" },
                                createdAt	: { type: "text" },
                                createdBy: {  type: "text"},
                                updatedAt	: { type: "text" },
                                updatedBy: {  type: "text"},
                                taxclassId	: { type: "text" },
                                inactivateReason	: { type: "text" },
                                companyId	: { type: "text" },
                                makeIds	: { type: "text" },
                                businessTypeIds	: { type: "text" },
                                charOfAccount	: { type: "text" },
                                profitCenterId	: { type: "text" },
                                costCenterId	: { type: "text" },
                                storageLocations: {
                                    type: "nested",
                                    properties: {
                                        id: { type: "text" },
                                        branchId: { type: "text" },
                                        storageId: { type: "text" },
                                        storage: {
                                            type: "nested",
                                            properties: {
                                                id: { type: "text" },
                                                code: { type: "text" },
                                                name: { type: "text" }
                                            }
                                        },
                                        zone: { type: "text" },
                                        regionId: { type: "text" },
                                        telephone: { type: "text" },
                                        fax: { type: "text" },
                                        area: { type: "text" },
                                        primaryContact: { type: "text" },
                                        shipToAddress1: { type: "text" },
                                        shipToAddress2: { type: "text" },
                                        shipToAddress3: { type: "text" },
                                        postcodeId: { type: "text" },
                                        cityId: { type: "text" },
                                        stateId: { type: "text" },
                                        countryId: { type: "text" },
                                        rfIdPoleNo: { type: "text" },
                                        followMainAddress: { type: "boolean" },
                                        telId: { type: "text" },
                                        faxId: { type: "text" },
                                        contactId: { type: "text" }
                                    }
                                },
                                branchRoutes: {
                                    type: "nested",
                                    properties: {
                                        id	: { type: "text" },
                                        routeName	: { type: "text" },
                                        duration	: { type: "text" },
                                        estimatedKMs	: { type: "text" },
                                        // status	: { type: "text" },
                                        // createdBy: {  type: "text", index_options: "docs"},
                                        // updatedBy: {  type: "text", index_options: "docs"},
                                        // createdAt	: { type: "date" },
                                        // updatedAt	: { type: "date" },
                                        // branchId	: { type: "text" },
                                    }
                                }
                            }
                        },
                        storageLocation: {
                            properties: {
                                id	: { type: "text" },
                                branchId	: { type: "text" },
                                storageId	: { type: "text" },
                                storage: {
                                    type: "nested",
                                    properties: {
                                        id	: { type: "text" },
                                        code	: { type: "text" },
                                        name	: { type: "text" },
                                        createdAt : { type: "text" },
                                        createdBy : { type: "text" },
                                        deleted : { type: "boolean" },
                                        inactivateReason : { type: "text" },
                                        status : { type: "text" },
                                        updatedAt : { type: "text" },
                                        updatedBy : { type: "text" },
                                    }
                                },
                                zone	: { type: "text" },
                                regionId	: { type: "text" },
                                telephone	: { type: "text" },
                                telId :  { type: "text" },
                                fax	: { type: "text" },
                                faxId : { type: "text" },
                                area	: { type: "text" },
                                primaryContact	: { type: "text" },
                                shipToAddress1	: { type: "text" },
                                shipToAddress2	: { type: "text" },
                                shipToAddress3	: { type: "text" },
                                postcodeId	: { type: "text" },
                                cityId	: { type: "text" },
                                stateId	: { type: "text" },
                                countryId	: { type: "text" },
                                contactId	: { type: "text" },
                                deleted	: { type: "boolean" },
                                createdBy: {  type: "text" },
                                updatedBy: {  type: "text" },
                                createdAt	: { type: "text" },
                                updatedAt	: { type: "text" },
                                // inactivateReason	: { type: "text", index_options: "docs" },
                                rfIdPoleNo	: { type: "text" },
                                followMainAddress : { type: "boolean" },
                                inactivateReason : { type: "text" },
                                status : { type: "text" }
                            }
                        },
                        vehicleMovements: {
                            type: "nested",
                            properties: {
                                id	: { type: "text" },
                                batchNo	: { type: "text" },
                                vehicleStockId	: { type: "text" },
                                vehicleStock	: { type: "text" },
                                vehicleLocationId	: { type: "text" },
                                vehicleLocation	: { type: "text" },
                                storageLocationId	: { type: "text" },
                                storageLocation	: { type: "text" },
                                remark	: { type: "text" },
                                vehicleStatus	: { type: "text" },
                                vdcStatus	: { type: "text" },
                                // status	: { type: "text" },
                                // deleted	: { type: "text" },
                                // inactivateReason	: { type: "text", index_options: "docs" },
                                // createdBy: {  type: "text", index_options: "docs"},
                                // updatedBy: {  type: "text", index_options: "docs"},
                                // createdAt	: { type: "date" },
                                // updatedAt	: { type: "date" },
                                // vehicleId	: { type: "text" },
                            }
                        },
                        onTruckRegNo: { type: "text" },
                        oicRectifications: {
                            type: "nested",
                            properties: {
                                id	: { type: "text" },
                                code	: { type: "text" },
                                serviceStartDate : { type: "text" },
                                serviceEndDate	: { type: "text" },
                                referenceDate	: { type: "text" },
                                vehicleStockId	: { type: "text" },
                                vehicleLocationId	: { type: "text" },
                                storageLocationId	: { type: "text" },
                                description	: { type: "text", index_options: "docs"},
                                // status	: { type: "text" },
                                // deleted	: { type: "text" },
                                // createdBy: {  type: "text", index_options: "docs"},
                                // updatedBy: {  type: "text", index_options: "docs"},
                                // createdAt	: { type: "date" },
                                // updatedAt	: { type: "date" },
                                // vehicleId	: { type: "text" },
                            }
                        },
                        contractorDetailes: {
                            type: "nested",
                            properties: {
                                id	: { type: "text" },
                                code	: { type: "text" },
                                startDateTime	: { type: "date", format : "dd-MM-yyyy"},
                                endDateTime	: { type: "date", format : "dd-MM-yyyy"},
                                description	: { type: "text", index_options: "docs"},
                                // status	: { type: "text" },
                                // deleted	: { type: "text" },
                                // createdBy: {  type: "text", index_options: "docs"},
                                // updatedBy: {  type: "text", index_options: "docs"},
                                // createdAt	: { type: "date" },
                                // updatedAt	: { type: "date" },
                                // vehicleId	: { type: "text" },
                                oicRectificationId	: { type: "text" },
                                startTime	: { type: "text" },
                                endTime	: { type: "text" },
                            }
                        },
                        vehicleSalesServiceHistories: {
                            type: "nested",
                            properties: {
                                id	: { type: "text" },
                                orderNo	: { type: "text" },
                                orderDate	: { type: "text" },
                                orderType	: { type: "text" },
                                registrationNo	: { type: "text" },
                                mileage	: { type: "text" },
                                branchId	: { type: "text" },
                                internalUserId	: { type: "text" },
                                customerId	: { type: "text" },
                                // status	: { type: "text" },
                                // deleted	: { type: "text" },
                                // createdBy: {  type: "text", index_options: "docs"},
                                // updatedBy: {  type: "text", index_options: "docs"},
                                // createdAt	: { type: "date" },
                                // updatedAt	: { type: "date" },
                                // vehicleId	: { type: "text" },                                
                            }
                        },
                        vehicleRegistrations: {
                            type: "nested",
                            properties: {
                                id	: { type: "text" },
                                registrationTypeId	: { type: "text" },
                                registrationDate	: { type: "text" },
                                registrationNo	: { type: "text" },
                                countryId	: { type: "text" },
                                customerId	: { type: "text" },
                                customerName	: { type: "text" },
                                mileage	: { type: "text" },
                                uomId	: { type: "text" },
                                // deleted	: { type: "text" },
                                // createdBy: {  type: "text", index_options: "docs"},
                                // updatedBy: {  type: "text", index_options: "docs"},
                                // createdAt	: { type: "date" },
                                // updatedAt	: { type: "date" },
                                // vehicleId	: { type: "text" },                                
                            }
                        },
                        vehicleKeys: {
                            type: "nested",
                            properties: {
                                id	: { type: "text" },
                                keyId	: { type: "text" },
                                value	: { type: "text" },
                                remark	: { type: "text", index_options: "docs"},
                                // deleted	: { type: "text" },
                                // createdBy: {  type: "text", index_options: "docs"},
                                // updatedBy: {  type: "text", index_options: "docs"},
                                // createdAt	: { type: "date" },
                                // updatedAt	: { type: "date" },
                                // vehicleId	: { type: "text" },                                
                            }
                        },
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