Installation:
1. copy .npmrc with read auth token to service root directory
2. run following command: npm i @driveit/driveit-databases

Usage sample:


  const auth = require('@driveit/driveit-databases/databases/auth');
  const authSyncDatabase = require('@driveit/driveit-databases').authSyncDatabase;

  authSyncDatabase(auth, {
    runMigration: true
  }).then(() => {
    initServer();
  })


Sample database relationship:
static associate(models) {

        this.myAssociation = this.belongsTo(models.VehicleBookingTradeInDetail, {
            foreignKey: 'vehicleBookingTradeInDetailId',
            targetKey: 'id'
        });
        this.myAssociation = this.belongsTo(models.BookingType, {
            foreignKey: 'bookingTypeId',
            targetKey: 'id'
        });

        this.myAssociation = this.hasMany(models.AccessoriesFitment, {
            foreignKey: 'vehicleBookingId',
            sourceKey: 'id'
        });
        this.myAssociation = this.hasMany(models.AccessoriesFitmentDocument, {
            foreignKey: 'vehicleBookingId',
            sourceKey: 'id'
        });
        this.myAssociation = this.hasMany(models.AccessoriesItem, {
            foreignKey: 'vehicleBookingId',
            sourceKey: 'id'
        });

        this.myAssociation = this.hasMany(models.VehicleBookingRefund, {
            foreignKey: 'vehicleBookingId',
            sourceKey: 'id'
        });

        this.myAssociation = this.hasOne(SpecMaster.VehicleUsage, {
            foreignKey: "id"
        });
        this.myAssociation = this.hasOne(SpecMaster.Color, {
            foreignKey: "id"
        });
        this.myAssociation = this.hasOne(SpecMaster.Product, {
            foreignKey: "id"
        });
        this.myAssociation = this.hasOne(SpecMaster.Package, {
            foreignKey: "id"
        });
        this.myAssociation = this.hasOne(SpecMaster.Variant, {
            foreignKey: "id"
        });
        this.myAssociation = this.hasOne(SpecMaster.Model, {
            foreignKey: "id"
        });

        this.myAssociation = this.hasOne(GeneralMaster.WarrantyProfile, {
            foreignKey: "id"
        });

        this.myAssociation = this.hasOne(CustomerMaster.Customer, {
            foreignKey: "id"
        });

        this.myAssociation = this.hasOne(CustomerMaster.Branch, {
            foreignKey: "id",
            as: "branch"
        });

        this.myAssociation = this.hasOne(CustomerMaster.DropPoint, {
            foreignKey: "id"
        });

        this.myAssociation = this.hasOne(CustomerMaster.Branch, {
            foreignKey: "id",
            sourceKey: "vehicleCurrentLocationId",
            as: "vehicleCurrentLocation"
        });


        this.myAssociation = this.hasOne(Auth.InternalUsers, {
            foreignKey: "id",
            sourceKey: "salesPersonId",
            as: "salesPerson",
        });

        this.myAssociation = this.hasOne(Auth.InternalUsers, {
            foreignKey: "id",
            sourceKey: "updatedBy",
            as: "updatedByInfo",
        });

        this.myAssociation = this.hasOne(Auth.InternalUsers, {
            foreignKey: "id",
            sourceKey: "createdBy",
            as: "createdByInfo",
        });
    }


Usage in include:
include = [{
                    model: VehicleBookingTradeInDetailModel
                },
                {
                    model: BookingTypeModel,
                    attributes:[...generalAttributes]
                },
                {
                    model: VehicleBookingRefundModel,
                },
                {
                    model: SpecMaster.VehicleUsage,
                    on: Sequelize.literal(
                        "`vehicleBooking`.`vehicleUsageId` = `spec_master`.`vehicleUsage`.`id` " 
                    ),
                    attributes:[...generalAttributes]
                },
                {
                    model: SpecMaster.Color,
                    on: Sequelize.literal(
                        "`vehicleBooking`.`colorId` = `spec_master`.`color`.`id` "
                    ),
                    attributes:[...generalAttributes]
                },
                {
                    model: SpecMaster.Product,
                    on: Sequelize.literal(
                        "`vehicleBooking`.`productId` = `spec_master`.`product`.`id` " 
                    ),
                    attributes:[...generalAttributes]
                },
                {
                    model: SpecMaster.Package,
                    on: Sequelize.literal(
                        "`vehicleBooking`.`packageId` = `spec_master`.`package`.`id` " 
                    ),
                    attributes:[...generalAttributes]
                },
                {
                    model: SpecMaster.Variant,
                    on: Sequelize.literal(
                        "`vehicleBooking`.`variantId` = `spec_master`.`variant`.`id` " 
                    ),
                    attributes:[...generalAttributes]
                },
                {
                    model: SpecMaster.Model,
                    on: Sequelize.literal(
                        "`vehicleBooking`.`modelId` = `spec_master`.`model`.`id` " 
                    ),
                    attributes:[...generalAttributes]
                },
                {
                    model: GeneralMaster.WarrantyProfile,
                    on: Sequelize.literal(
                        "`vehicleBooking`.`warrantyProfileId` = `general_master`.`warrantyProfile`.`id` " 
                    ),
                    attributes:[...generalAttributes]
                },
                {
                    model: CustomerMaster.Customer,
                    on: Sequelize.literal(
                        "`vehicleBooking`.`customerId` = `customer_master`.`customer`.`id` " 
                    ),
                    include:[
                        {
                            model: CustomerMaster.CustomerAccountGroup,
                            attributes:[...generalAttributes]
                        },
                        {
                            model: CustomerMaster.CustomerDetails,
                            include: [
                                {
                                    model: CustomerMaster.CustomerGroup,
                                    attributes:[...generalAttributes]
                                },
                                {
                                    model: GeneralMaster.PostCode,
                                    as: "cPostcode",
                                    attributes:["id", "code"]
                                },
                                {
                                    model: GeneralMaster.PostCode,
                                    as: "mPostcode",
                                    attributes:["id", "code"]
                                }
                            ]
                        }
                    ]
                },
                {
                    model: CustomerMaster.Branch,
                    on: Sequelize.literal(
                        "`vehicleBooking`.`branchId` = `customer_master`.`branch`.`id` " 
                    ),
                    as: "branch",
                    attributes:[...generalAttributes],
                },
                {
                    model: CustomerMaster.DropPoint,
                    on: Sequelize.literal(
                        "`vehicleBooking`.`dropPointId` = `customer_master`.`dropPoint`.`id` " 
                    ),
                },
                {
                    model: CustomerMaster.Branch,
                    as: "vehicleCurrentLocation",
                    attributes:[...generalAttributes]
                },
                {
                    model: Auth.InternalUsers,
                    as: "salesPerson"
                },
                {
                    model: Auth.InternalUsers,
                    as: "updatedByInfo"
                },
                {
                    model: Auth.InternalUsers,
                    as: "createdByInfo"
                },
            ];
  

Publishing:
0. make sure you run "npm run test" without errors
1. pull & commit & push your git
2. increment package version in package.json
3. make sure .npmrc has read/write auth token
4. run following command: npm publish
