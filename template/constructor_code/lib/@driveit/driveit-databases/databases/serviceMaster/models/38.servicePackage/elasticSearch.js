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

const indexName = 'service-package-master';
const docType = 'servicePackageMaster';

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
          "properties": {
            "branchId": {
              "type": "keyword"
            },
            "businessStreamId": {
              "type": "text"
            },
            "changable": {
              "type": "text"
            },
            "code": {
              "type": "keyword",
              "normalizer": "normalizer_uppercase"
            },
            "companyId": {
              "type": "keyword"
            },
            "createdAt": {
              "type": "date"
            },
            "createdBy": {
              "type": "text"
            },
            "currencyCode": {
              "type": "text"
            },
            "currencyId": {
              "type": "text"
            },
            "currencyName": {
              "type": "text"
            },
            "deleted": {
              "type": "boolean"
            },
            "expressService": {
              "type": "text"
            },
            "externalKey": {
              "type": "text"
            },
            "id": {
              "type": "keyword"
            },
            "make": {
              "properties": {
                "code": {
                  "type": "keyword",
                  "normalizer": "normalizer_uppercase"
                },
                "createdAt": {
                  "type": "date"
                },
                "createdBy": {
                  "type": "text"
                },
                "deleted": {
                  "type": "boolean"
                },
                "id": {
                  "type": "keyword"
                },
                "jpjmakeId": {
                  "type": "text"
                },
                "name": {
                  "type": "keyword",
                  "normalizer": "normalizer_uppercase"
                },
                "status": {
                  "type": "text"
                },
                "updatedAt": {
                  "type": "date"
                },
                "updatedBy": {
                  "type": "text"
                }
              }
            },
            "makeId": {
              "type": "keyword"
            },
            "milage": {
              "type": "text"
            },
            "milageTolerance": {
              "type": "text"
            },
            "mileageFrom": {
              "type": "text"
            },
            "mileageTo": {
              "type": "text"
            },
            "name": {
              "type": "keyword",
              "normalizer": "normalizer_uppercase"
            },
            "netPrice": {
              "type": "long"
            },
            "packageType": {
              "properties": {
                "code": {
                  "type": "keyword",
                  "normalizer": "normalizer_uppercase"
                },
                "createdAt": {
                  "type": "date"
                },
                "createdBy": {
                  "type": "text"
                },
                "deleted": {
                  "type": "boolean"
                },
                "id": {
                  "type": "keyword"
                },
                "inactivateReason": {
                  "type": "text"
                },
                "name": {
                  "type": "keyword",
                  "normalizer": "normalizer_uppercase"
                },
                "packageUsageId": {
                  "type": "text"
                },
                "status": {
                  "type": "text"
                },
                "updatedAt": {
                  "type": "date"
                },
                "updatedBy": {
                  "type": "text"
                }
              }
            },
            "packageTypeId": {
              "type": "text"
            },
            "priceBy": {
              "type": "long"
            },
            "serviceJobParts": {
              "properties": {
                "changable": {
                  "type": "text"
                },
                "createdAt": {
                  "type": "date"
                },
                "createdBy": {
                  "type": "text"
                },
                "deleted": {
                  "type": "boolean"
                },
                "description": {
                  "type": "text"
                },
                "id": {
                  "type": "text"
                },
                "itemCategory": {
                  "type": "text"
                },
                "job": {
                  "properties": {
                    "code": {
                      "type": "text"
                    },
                    "createdAt": {
                      "type": "date"
                    },
                    "createdBy": {
                      "type": "text"
                    },
                    "deleted": {
                      "type": "boolean"
                    },
                    "id": {
                      "type": "text"
                    },
                    "inactivateReason": {
                      "type": "text"
                    },
                    "jobCatalogId": {
                      "type": "text"
                    },
                    "jobClass": {
                      "properties": {
                        "code": {
                          "type": "text"
                        },
                        "createdAt": {
                          "type": "date"
                        },
                        "createdBy": {
                          "type": "text"
                        },
                        "deleted": {
                          "type": "boolean"
                        },
                        "id": {
                          "type": "text"
                        },
                        "name": {
                          "type": "text"
                        },
                        "qcbyforeman": {
                          "type": "boolean"
                        },
                        "status": {
                          "type": "text"
                        },
                        "updatedAt": {
                          "type": "date"
                        },
                        "updatedBy": {
                          "type": "text"
                        }
                      }
                    },
                    "jobClassCode": {
                      "type": "text"
                    },
                    "jobClassId": {
                      "type": "text"
                    },
                    "jobClassName": {
                      "type": "text"
                    },
                    "jobCode": {
                      "type": "text"
                    },
                    "jobGroupId": {
                      "type": "text"
                    },
                    "jobName": {
                      "type": "text"
                    },
                    "jobType": {
                      "properties": {
                        "code": {
                          "type": "text"
                        },
                        "createdAt": {
                          "type": "date"
                        },
                        "createdBy": {
                          "type": "text"
                        },
                        "deleted": {
                          "type": "boolean"
                        },
                        "id": {
                          "type": "text"
                        },
                        "inactivateReason": {
                          "type": "text"
                        },
                        "name": {
                          "type": "text"
                        },
                        "status": {
                          "type": "text"
                        },
                        "updatedAt": {
                          "type": "date"
                        },
                        "updatedBy": {
                          "type": "text"
                        }
                      }
                    },
                    "jobTypeCode": {
                      "type": "text"
                    },
                    "jobTypeId": {
                      "type": "text"
                    },
                    "jobTypeName": {
                      "type": "text"
                    },
                    "jobsParts": {
                      "properties": {
                        "createdAt": {
                          "type": "date"
                        },
                        "createdBy": {
                          "type": "text"
                        },
                        "deleted": {
                          "type": "boolean"
                        },
                        "id": {
                          "type": "text"
                        },
                        "inactivateReason": {
                          "type": "text"
                        },
                        "jobCatalogId": {
                          "type": "text"
                        },
                        "jobPartsMasterId": {
                          "type": "text"
                        },
                        "jobServiceModelId": {
                          "type": "text"
                        },
                        "jobsId": {
                          "type": "text"
                        },
                        "materialDesc": {
                          "type": "text"
                        },
                        "materialId": {
                          "type": "text"
                        },
                        "quantity": {
                          "type": "text"
                        },
                        "status": {
                          "type": "text"
                        },
                        "uomId": {
                          "type": "text"
                        },
                        "updatedAt": {
                          "type": "date"
                        },
                        "updatedBy": {
                          "type": "text"
                        }
                      }
                    },
                    "materialId": {
                      "type": "text"
                    },
                    "name": {
                      "type": "text"
                    },
                    "poGeneration": {
                      "type": "text"
                    },
                    "status": {
                      "type": "text"
                    },
                    "uomId": {
                      "type": "text"
                    },
                    "updatedAt": {
                      "type": "date"
                    },
                    "updatedBy": {
                      "type": "text"
                    }
                  }
                },
                "jobId": {
                  "type": "text"
                },
                "jobPartNo": {
                  "type": "text"
                },
                "materialDescription": {
                  "type": "text"
                },
                "materialId": {
                  "type": "text"
                },
                "materialMasterId": {
                  "type": "text"
                },
                "materialTypeCode": {
                  "type": "text"
                },
                "materialTypeId": {
                  "type": "text"
                },
                "materialTypeName": {
                  "type": "text"
                },
                "materialGroupCode": {
                  "type": "text"
                },
                "materialGroupId": {
                  "type": "text"
                },
                "materialGroupName": {
                  "type": "text"
                },
                "netPrice": {
                  "type": "long"
                },
                "partCode": {
                  "type": "text"
                },
                "partGroupCode": {
                  "type": "text"
                },
                "partGroupId": {
                  "type": "text"
                },
                "partGroupName": {
                  "type": "text"
                },
                "partName": {
                  "type": "text"
                },
                "partsData": {
                  "properties": {
                    "country": {
                      "properties": {
                        "citizenship": {
                          "type": "text"
                        },
                        "code": {
                          "type": "text"
                        },
                        "countryDialCode": {
                          "type": "text"
                        },
                        "createdAt": {
                          "type": "date"
                        },
                        "createdBy": {
                          "type": "text"
                        },
                        "currencyId": {
                          "type": "text"
                        },
                        "deleted": {
                          "type": "boolean"
                        },
                        "id": {
                          "type": "text"
                        },
                        "name": {
                          "type": "text"
                        },
                        "operatorCode": {
                          "type": "text"
                        },
                        "status": {
                          "type": "text"
                        },
                        "updatedAt": {
                          "type": "date"
                        },
                        "updatedBy": {
                          "type": "text"
                        }
                      }
                    },
                    "countryId": {
                      "type": "text"
                    },
                    "createdAt": {
                      "type": "date"
                    },
                    "createdBy": {
                      "type": "text"
                    },
                    "deleted": {
                      "type": "boolean"
                    },
                    "fileName": {
                      "type": "text"
                    },
                    "fileUrl": {
                      "type": "text"
                    },
                    "id": {
                      "type": "text"
                    },
                    "inactivateReason": {
                      "type": "text"
                    },
                    "make": {
                      "type": "text"
                    },
                    "materialAccountings": {
                      "properties": {
                        "accountingBranch": {
                          "type": "text"
                        },
                        "accountingBranchName": {
                          "type": "text"
                        },
                        "accountingCurrrency": {
                          "type": "text"
                        },
                        "accountingId": {
                          "type": "text"
                        },
                        "accountingTotalValue": {
                          "type": "text"
                        },
                        "accountingValidityEndDate": {
                          "type": "date"
                        },
                        "accountingValidityStartDate": {
                          "type": "date"
                        },
                        "accountingValuationPrice": {
                          "type": "text"
                        },
                        "accountingValuationStrategy": {
                          "type": "text"
                        },
                        "accountingcurrencyName": {
                          "type": "text"
                        },
                        "accountingtotalStock": {
                          "type": "text"
                        },
                        "createdAt": {
                          "type": "date"
                        },
                        "createdBy": {
                          "type": "text"
                        },
                        "deleted": {
                          "type": "boolean"
                        },
                        "externalAccountingPPG": {
                          "type": "text"
                        },
                        "id": {
                          "type": "text"
                        },
                        "internalAccountingPPG": {
                          "type": "text"
                        },
                        "updatedAt": {
                          "type": "date"
                        },
                        "updatedBy": {
                          "type": "text"
                        },
                        "workShopStock": {
                          "type": "boolean"
                        }
                      }
                    },
                    "materialContractors": {
                      "properties": {
                        "createdAt": {
                          "type": "date"
                        },
                        "createdBy": {
                          "type": "text"
                        },
                        "deleted": {
                          "type": "boolean"
                        },
                        "id": {
                          "type": "text"
                        },
                        "materialMasterBasicinfoId": {
                          "type": "text"
                        },
                        "percentage": {
                          "type": "long"
                        },
                        "updatedAt": {
                          "type": "date"
                        },
                        "updatedBy": {
                          "type": "text"
                        },
                        "vendorId": {
                          "type": "text"
                        }
                      }
                    },
                    "materialDescription": {
                      "type": "text"
                    },
                    "materialGroupCode": {
                      "properties": {
                        "code": {
                          "type": "text"
                        },
                        "createdAt": {
                          "type": "date"
                        },
                        "createdBy": {
                          "type": "text"
                        },
                        "deleted": {
                          "type": "boolean"
                        },
                        "externalAccountingPPG": {
                          "type": "text"
                        },
                        "id": {
                          "type": "text"
                        },
                        "inactivateReason": {
                          "type": "text"
                        },
                        "internalAccountingPPG": {
                          "type": "text"
                        },
                        "name": {
                          "type": "text"
                        },
                        "status": {
                          "type": "text"
                        },
                        "updatedAt": {
                          "type": "date"
                        },
                        "updatedBy": {
                          "type": "text"
                        }
                      }
                    },
                    "materialGroupId": {
                      "type": "text"
                    },
                    "materialId": {
                      "type": "text"
                    },
                    "materialMakeIds": {
                      "properties": {
                        "createdAt": {
                          "type": "date"
                        },
                        "createdBy": {
                          "type": "text"
                        },
                        "deleted": {
                          "type": "boolean"
                        },
                        "id": {
                          "type": "text"
                        },
                        "makeId": {
                          "type": "text"
                        },
                        "materialId": {
                          "type": "text"
                        },
                        "updatedAt": {
                          "type": "date"
                        },
                        "updatedBy": {
                          "type": "text"
                        }
                      }
                    },
                    "materialProcurements": {
                      "properties": {
                        "branch": {
                          "type": "text"
                        },
                        "createdAt": {
                          "type": "date"
                        },
                        "createdBy": {
                          "type": "text"
                        },
                        "id": {
                          "type": "text"
                        },
                        "itemCategory": {
                          "type": "text"
                        },
                        "make": {
                          "type": "text"
                        },
                        "procurementBranchName": {
                          "type": "text"
                        },
                        "procurementId": {
                          "type": "text"
                        },
                        "procurementMakeName": {
                          "type": "text"
                        },
                        "procurementUomName": {
                          "type": "text"
                        },
                        "purchaseUom": {
                          "type": "text"
                        },
                        "updatedAt": {
                          "type": "date"
                        },
                        "updatedBy": {
                          "type": "text"
                        },
                        "validEndDate": {
                          "type": "date"
                        },
                        "validStartDate": {
                          "type": "date"
                        },
                        "vendor": {
                          "type": "text"
                        },
                        "vendorMaterialNo": {
                          "type": "text"
                        }
                      }
                    },
                    "materialSales": {
                      "properties": {
                        "createdAt": {
                          "type": "date"
                        },
                        "createdBy": {
                          "type": "text"
                        },
                        "id": {
                          "type": "text"
                        },
                        "materialMatId": {
                          "type": "text"
                        },
                        "salesBranchName": {
                          "type": "text"
                        },
                        "salesIdCount": {
                          "type": "text"
                        },
                        "salesMake": {
                          "type": "text"
                        },
                        "salesMakeName": {
                          "type": "text"
                        },
                        "salesPurchaseUom": {
                          "type": "text"
                        },
                        "salesPurchaseUomName": {
                          "type": "text"
                        },
                        "salesStatus": {
                          "type": "boolean"
                        },
                        "salesValidityEndDate": {
                          "type": "date"
                        },
                        "salesValidityStartDate": {
                          "type": "date"
                        },
                        "salesbranch": {
                          "type": "text"
                        },
                        "taxClassIndicatorname": {
                          "type": "text"
                        },
                        "taxClassInicator": {
                          "type": "text"
                        },
                        "updatedAt": {
                          "type": "date"
                        },
                        "updatedBy": {
                          "type": "text"
                        }
                      }
                    },
                    "materialStorages": {
                      "properties": {
                        "createdAt": {
                          "type": "date"
                        },
                        "createdBy": {
                          "type": "text"
                        },
                        "id": {
                          "type": "text"
                        },
                        "storageBranch": {
                          "type": "text"
                        },
                        "storageBranchName": {
                          "type": "text"
                        },
                        "storageId": {
                          "type": "text"
                        },
                        "storageLocation": {
                          "type": "text"
                        },
                        "storageLocationName": {
                          "type": "text"
                        },
                        "updatedAt": {
                          "type": "date"
                        },
                        "updatedBy": {
                          "type": "text"
                        }
                      }
                    },
                    "materialSuperSessions": {
                      "properties": {
                        "createdAt": {
                          "type": "date"
                        },
                        "createdBy": {
                          "type": "text"
                        },
                        "id": {
                          "type": "text"
                        },
                        "materialDescription": {
                          "type": "text"
                        },
                        "materialId": {
                          "type": "text"
                        },
                        "superSessionId": {
                          "type": "text"
                        },
                        "superSessionValidityEndDate": {
                          "type": "date"
                        },
                        "superSessionValidityStartDate": {
                          "type": "date"
                        },
                        "updatedAt": {
                          "type": "date"
                        },
                        "updatedBy": {
                          "type": "text"
                        }
                      }
                    },
                    "materialType": {
                      "properties": {
                        "code": {
                          "type": "text"
                        },
                        "createdAt": {
                          "type": "date"
                        },
                        "createdBy": {
                          "type": "text"
                        },
                        "deleted": {
                          "type": "boolean"
                        },
                        "id": {
                          "type": "text"
                        },
                        "inventory": {
                          "type": "text"
                        },
                        "name": {
                          "type": "text"
                        },
                        "status": {
                          "type": "text"
                        },
                        "updatedAt": {
                          "type": "date"
                        },
                        "updatedBy": {
                          "type": "text"
                        }
                      }
                    },
                    "materialTypeId": {
                      "type": "text"
                    },
                    "materialUomId": {
                      "type": "text"
                    },
                    "materialWarranties": {
                      "properties": {
                        "createdAt": {
                          "type": "date"
                        },
                        "createdBy": {
                          "type": "text"
                        },
                        "deleted": {
                          "type": "boolean"
                        },
                        "id": {
                          "type": "text"
                        },
                        "reimburserId": {
                          "type": "text"
                        },
                        "reimburserName": {
                          "type": "text"
                        },
                        "updatedAt": {
                          "type": "date"
                        },
                        "updatedBy": {
                          "type": "text"
                        },
                        "warrantyCategory": {
                          "type": "text"
                        },
                        "warrantyId": {
                          "type": "text"
                        },
                        "warrantyOriginPart": {
                          "type": "text"
                        },
                        "warrantyTolleranceKM": {
                          "type": "text"
                        },
                        "warrantyTolleranceMonths": {
                          "type": "text"
                        }
                      }
                    },
                    "quantityConversion": {
                      "properties": {
                        "correspondingQty": {
                          "type": "text"
                        },
                        "correspondingUom": {
                          "type": "text"
                        },
                        "createdAt": {
                          "type": "date"
                        },
                        "createdBy": {
                          "type": "text"
                        },
                        "id": {
                          "type": "text"
                        },
                        "referenceQty": {
                          "type": "text"
                        },
                        "referenceUom": {
                          "type": "text"
                        },
                        "updatedAt": {
                          "type": "date"
                        },
                        "updatedBy": {
                          "type": "text"
                        }
                      }
                    },
                    "quantityConversions": {
                      "properties": {
                        "correspondingQty": {
                          "type": "text"
                        },
                        "correspondingUom": {
                          "type": "text"
                        },
                        "createdAt": {
                          "type": "date"
                        },
                        "createdBy": {
                          "type": "text"
                        },
                        "id": {
                          "type": "text"
                        },
                        "materialMatId": {
                          "type": "text"
                        },
                        "referenceQty": {
                          "type": "text"
                        },
                        "referenceUom": {
                          "type": "text"
                        },
                        "updatedAt": {
                          "type": "date"
                        },
                        "updatedBy": {
                          "type": "text"
                        }
                      }
                    },
                    "quantityId": {
                      "type": "text"
                    },
                    "remarks": {
                      "type": "text"
                    },
                    "status": {
                      "type": "text"
                    },
                    "uom": {
                      "properties": {
                        "code": {
                          "type": "text"
                        },
                        "createdAt": {
                          "type": "date"
                        },
                        "createdBy": {
                          "type": "text"
                        },
                        "deleted": {
                          "type": "boolean"
                        },
                        "id": {
                          "type": "text"
                        },
                        "name": {
                          "type": "text"
                        },
                        "status": {
                          "type": "text"
                        },
                        "unitofmeasure": {
                          "type": "text"
                        },
                        "updatedAt": {
                          "type": "date"
                        },
                        "updatedBy": {
                          "type": "text"
                        }
                      }
                    },
                    "updatedAt": {
                      "type": "date"
                    },
                    "updatedBy": {
                      "type": "text"
                    },
                    "uploadBy": {
                      "type": "text"
                    },
                    "uploadDate": {
                      "type": "text"
                    },
                    "vendor": {
                      "type": "text"
                    },
                    "vendorMaterialNo": {
                      "type": "text"
                    },
                    "warrantyTolerenceDistance": {
                      "type": "long"
                    },
                    "warrantyTolerenceMonths": {
                      "type": "long"
                    }
                  }
                },
                "quantity": {
                  "type": "text"
                },
                "relatedJobId": {
                  "type": "text"
                },
                "relatedJobName": {
                  "type": "text"
                },
                "relatedJobNo": {
                  "type": "text"
                },
                "servicePackageId": {
                  "type": "text"
                },
                "status": {
                  "type": "text"
                },
                "taxAmount": {
                  "type": "text"
                },
                "taxable": {
                  "type": "boolean"
                },
                "type": {
                  "type": "text"
                },
                "uomCode": {
                  "type": "text"
                },
                "uomId": {
                  "type": "text"
                },
                "uomName": {
                  "type": "text"
                },
                "updatedAt": {
                  "type": "date"
                },
                "updatedBy": {
                  "type": "text"
                }
              }
            },
            "serviceModels": {
              "properties": {
                "bodyTypeCode": {
                  "type": "text"
                },
                "bodyTypeId": {
                  "type": "text"
                },
                "bodyTypeName": {
                  "type": "text"
                },
                "createdAt": {
                  "type": "date"
                },
                "createdBy": {
                  "type": "text"
                },
                "deleted": {
                  "type": "boolean"
                },
                "engineTypeId": {
                  "type": "text"
                },
                "id": {
                  "type": "text"
                },
                "modelCode": {
                  "type": "text"
                },
                "modelId": {
                  "type": "text"
                },
                "modelName": {
                  "type": "text"
                },
                "serviceModelId": {
                  "type": "text"
                },
                "servicePackageId": {
                  "type": "text"
                },
                "status": {
                  "type": "text"
                },
                "updatedAt": {
                  "type": "date"
                },
                "updatedBy": {
                  "type": "text"
                }
              }
            },
            "serviceTax": {
              "type": "long"
            },
            "status": {
              "type": "text"
            },
            "totalLabour": {
              "type": "long"
            },
            "totalParts": {
              "type": "long"
            },
            "totalSublet": {
              "type": "long"
            },
            "updatedAt": {
              "type": "date"
            },
            "updatedBy": {
              "type": "text"
            },
            "validFrom": {
              "type": "date"
            },
            "validTo": {
              "type": "date"
            }
          }
        }
        // properties: {
        //     id: { type: "keyword" },
        //     code: {
        //         type: "keyword",
        //         normalizer: "normalizer_uppercase"
        //     },
        //     name: {
        //         type: "keyword",
        //         normalizer: "normalizer_uppercase"
        //     },
        //     companyId: { type: "keyword" },
        //     branchId: { type: "keyword" },
        //     makeId: { type: "keyword" },
        //     make: {
        //         properties :{
        //         id: { type: "keyword" },
        //         code: {
        //             type: "keyword",
        //             normalizer: "normalizer_uppercase"
        //         },
        //         name: {
        //             type: "keyword",
        //             normalizer: "normalizer_uppercase"
        //         },
        //     }
        //     },
        //     // // businessStreamId: { type: "text" },
        //     // packageTypeId: { type: "text" },
        //     packageType: {
        //         properties :{
        //         id: { type: "keyword" },
        //         code: {
        //             type: "keyword",
        //             normalizer: "normalizer_uppercase"
        //         },
        //         name: {
        //             type: "keyword",
        //             normalizer: "normalizer_uppercase"
        //         },
        //         }
        //     },
        // externalKey: { type: "text" },
        // mileageFrom: { type: "text" },
        // mileageTo: { type: "text" },
        // currencyCode: { type: "keyword" },
        // currencyName: { type: "keyword" },
        // validFrom: { type: "text" },
        // validTo: { type: "text" },
        // currencyId: { type: "text" },
        // changable: { type: "text" },
        // expressService: { type: "text" },
        // priceBy: { type: "text" },
        // totalLabour: { type: "text" },
        // totalParts: { type: "text" },
        // totalSublet: { type: "text" },
        // serviceTax: { type: "text" },
        // netPrice: { type: "text" },
        // status: { type: "text" },
        // inactivateReason: { type: "text" },
        // deleted: { type: "text" },
        // createdBy: { type: "text" },
        // updatedBy: { type: "text" },
        // createdAt: { type: "text" },
        // updatedAt: { type: "text" },
        // serviceModels: {
        //     type: 'nested',
        //     properties: {
        //         id: { type: "text" },
        //         modelId: { type: "text" },
        //         serviceModelId: { type: "text" },
        //         bodyTypeId: { type: "text" },
        //         engineTypeId: { type: "text" },
        //         status: { type: "text" },
        //         inactivateReason: { type: "text" },
        //         deleted: { type: "text" },
        //         servicePackageId: { type: "text" },
        //         bodyTypeCode: { type: "text" },
        //         bodyTypeName: { type: "text" },
        //         modelCode: { type: "text" },
        //         modelName: { type: "text" },
        //     }
        // },
        // serviceJobParts: {
        //     type: 'nested',
        //     properties: {
        //         id: { type: "text" },
        //         jobPartNo: { type: "text" },
        //         itemCategory: { type: "text" },
        //         quantity: { type: "text" },
        //         uomId: { type: "text" },
        //         materialMasterId: { type: "text" },
        //         description: { type: "text" },
        //         unitPrice: { type: "text" },
        //         netPrice: { type: "text" },
        //         changable: { type: "text" },
        //         relatedJobNo: { type: "text" },
        //         relatedJobId: { type: "text" },
        //         relatedJobName: { type: "text" },
        // status: { type: "text" },
        //         inactivateReason: { type: "text" },
        //         type: { type: "text" },
        //         deleted: { type: "text" },
        //         jobId: { type: "text" },
        //         servicePackageId: { type: "text" },
        //         job: {
        //             properties: {
        //                 id: { type: "text" },
        //                 code: { type: "text" },
        //                 name: { type: "text" },
        //                 uomId: { type: "text" },
        //                 hours: { type: "text" },
        //                 amount: { type: "text" },
        //                 materialId: { type: "text" },
        //                 poGeneration: { type: "text" },
        //                 jobGroupId: { type: "text" },
        //                 jobType: {
        //                     properties: {
        //                         id: { type: "text" },
        //                         code: { type: "text" },
        //                         name: { type: "text" },
        //                         status: { type: "text" },
        //                         inactivateReason: { type: "text" },
        //                         deleted: { type: "text" },
        //                     }
        //                 },
        //                 status: { type: "text" },
        //                 inactivateReason: { type: "text" },
        //                 deleted: { type: "text" },
        //                 createdBy: { type: "text" },
        //                 updatedBy: { type: "text" },
        //                 createdAt: { type: "text" },
        //                 updatedAt: { type: "text" },
        //                 jobClassId: { type: "text" },
        //                 jobClass: {
        //                     properties: {
        //                         id: { type: "text" },
        //                         code: { type: "text" },
        //                         name: { type: "text" },
        //                         status: { type: "text" },
        //                         inactivateReason: { type: "text" },
        //                         deleted: { type: "text" },
        //                         qcbyforeman: { type: "text" },
        //                     }
        //                 }
        //             }
        //         },
        //         partCode: { type: "text" },
        //         partName: { type: "text" },
        //         partGroupId: { type: "text" },
        //         partGroupCode: { type: "text" },
        //         partGroupName: { type: "text" },
        //         uomCode: { type: "text" },
        //         uomName: { type: "text" },
        //         materialTypeId: { type: "text" },
        //         materialTypeCode: { type: "text" },
        //         materialTypeName: { type: "text" },
        //     }
        // }
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