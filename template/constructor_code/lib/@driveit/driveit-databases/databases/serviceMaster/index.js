const Sequelize = require("sequelize");
const databaseName = (process.env.dbtest ? process.env.dbtest : "") + "service_master"

const databaseAccount = JSON.parse(process.env.databaseAccount);
console.info(`new instance of sequelize with config - dbname: ${databaseName} - username: ${databaseAccount.username} - dialect: ${databaseAccount.options.dialect}`);

let options = databaseAccount.options;
// options.logging = true;
if (process.env.NODE_ENV === 'development-local') {
    delete options.dialectOptions;
    // options.logging = console.log;
}
options.define = {
    // charset: 'utf8mb4',
    // collate: 'utf8_bin'
}
console.log('connection config', options);

// ElasticSearch 
const RepairOrderES = require('./models/07.repairOrder/elasticSearch');
const PreRepairOrderES = require('./models/87.PreRepairOrder/elasticSearch');
const ServicePackageES = require('./models/38.servicePackage/elasticSearch');
let sequelize = new Sequelize(
    databaseName,
    databaseAccount.username,
    databaseAccount.password,
    options);

// sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");
sequelize.dialect.supports.schemas = true; //this to prevent schema name in table

const models = {
    Appointments: require("./models/01.appointments").init(sequelize, Sequelize, databaseName),
    AppointmentType: require("./models/02.appointmentType").init(sequelize, Sequelize, databaseName),
    AppointmentMethod: require("./models/03.appointmentMethod").init(sequelize, Sequelize, databaseName),
    JobType: require("./models/04.jobType").init(sequelize, Sequelize, databaseName),
    // Parts: require("./models/05.parts").init(sequelize, Sequelize, databaseName),
    JobClass: require("./models/06.jobClass").init(sequelize, Sequelize, databaseName),
    JobGroup: require("./models/34.jobGroup").init(sequelize, Sequelize, databaseName),
    RepairOrder: require("./models/07.repairOrder").init(sequelize, Sequelize, databaseName),
    RepairOrderType: require("./models/08.repairOrderType").init(sequelize, Sequelize, databaseName),
    AppointmentRules: require("./models/09.appointmentRules").init(sequelize, Sequelize, databaseName),
    FlatRate: require("./models/10.flatRate").init(sequelize, Sequelize, databaseName),
    RepairOrderFlatRate: require("./models/11.repairOrderFlatRate").init(sequelize, Sequelize, databaseName),
    RepairOrderParts: require("./models/12.repairOrderParts").init(sequelize, Sequelize, databaseName),
    RepairOrderInvoice: require("./models/13.repairOrderInvoice").init(sequelize, Sequelize, databaseName),
    // UOM: require("./models/14.uom").init(sequelize, Sequelize, databaseName),
    PartGroup: require("./models/15.partGroup").init(sequelize, Sequelize, databaseName),

    JobCatalog: require("./models/33.jobCatalog").init(sequelize, Sequelize, databaseName),
    ServicePackage: require("./models/38.servicePackage").init(sequelize, Sequelize, databaseName),
    JobsParts: require("./models/17.jobsParts").init(sequelize, Sequelize, databaseName),
    Jobs: require("./models/16.jobs").init(sequelize, Sequelize, databaseName),

    ActivityCostType: require("./models/18.activityCostType").init(sequelize, Sequelize, databaseName),
    ActivityLeaveType: require("./models/19.activityLeaveType").init(sequelize, Sequelize, databaseName),
    YearlyCalendar: require("./models/20.yearlyCalendar").init(sequelize, Sequelize, databaseName),
    YearlyCalendarPublicHoliday: require("./models/21.yearlyCalendarPublicHoliday").init(sequelize, Sequelize, databaseName),
    YearlyCalendarWeeklyRestDay: require("./models/22.yearlyCalendarWeeklyRestDay").init(sequelize, Sequelize, databaseName),
    TimeRecordingEventType: require("./models/23.timeRecordingEventType").init(sequelize, Sequelize, databaseName),
    TimeRecordingEventTypeGroup: require("./models/24.timeRecordingEventTypeGroup").init(sequelize, Sequelize, databaseName),
    TimeRecordingTerminal: require("./models/26.timeRecordingTerminal").init(sequelize, Sequelize, databaseName),
    TimeRecording: require("./models/27.timeRecording").init(sequelize, Sequelize, databaseName),
    AssignCost: require("./models/28.assignCost").init(sequelize, Sequelize, databaseName),
    PlannedAttendanceLeave: require("./models/29.plannedAttendanceLeave").init(sequelize, Sequelize, databaseName),
    TimeRecordingEventTypeVGroup: require("./models/30.timeRecordingEventTypeVGroup").init(sequelize, Sequelize, databaseName),
    WorkSchedule: require("./models/31.workSchedule").init(sequelize, Sequelize, databaseName),
    BranchHoliday: require("./models/32.branchHoliday").init(sequelize, Sequelize, databaseName),
    BayType: require("./models/41.bayType").init(sequelize, Sequelize, databaseName),
    JobMaster: require("./models/35.jobMaster").init(sequelize, Sequelize, databaseName),
    JobServiceModel: require("./models/36.jobServiceModel").init(sequelize, Sequelize, databaseName),
    JobPartsMaster: require("./models/37.jobPartsMaster").init(sequelize, Sequelize, databaseName),
    ServiceModel: require("./models/39.serviceModel").init(sequelize, Sequelize, databaseName),
    ServiceJobPart: require("./models/40.serviceJobPart").init(sequelize, Sequelize, databaseName),
    BayMaster: require("./models/42.bayMaster").init(sequelize, Sequelize, databaseName),
    Packages: require("./models/41.packages").init(sequelize, Sequelize, databaseName),
    RepairOrderPackages: require("./models/43.repairOrderPackages").init(sequelize, Sequelize, databaseName),
    RepairOrderSuppersessionParts: require("./models/44.roSupperSession").init(sequelize, Sequelize, databaseName),
    UploadAttachment: require("./models/45.roUploadAttachment").init(sequelize, Sequelize, databaseName),
    PurchaseOrder: require("./models/46.purchaseOrder").init(sequelize, Sequelize, databaseName),
    PoItems: require("./models/47.poItems").init(sequelize, Sequelize, databaseName),
    Billing: require("./models/48.billing").init(sequelize, Sequelize, databaseName),
    CustomerTag: require("./models/49.customerTag").init(sequelize, Sequelize, databaseName),
    SourceProblem: require("./models/50.sourceProblem").init(sequelize, Sequelize, databaseName),
    WarrantyClass: require("./models/51.warrantyClass").init(sequelize, Sequelize, databaseName),
    WarrantyClaimStatus: require("./models/52.warrantyClaimStatus").init(sequelize, Sequelize, databaseName),
    SymptomCategory: require("./models/53.symptomCategory").init(sequelize, Sequelize, databaseName),
    RepairOrderInsurance: require("./models/61.insurance").init(sequelize, Sequelize, databaseName),
    WarrantyIncident: require("./models/54.warrantyIncident").init(sequelize, Sequelize, databaseName),
    // WarrantyIncidentJobs: require("./models/55.warrantyIncidentJobs").init(sequelize, Sequelize, databaseName),
    // WarrantyIncidentParts: require("./models/56.warrantyIncidentParts").init(sequelize, Sequelize, databaseName),
    PNC: require("./models/57.pnc").init(sequelize, Sequelize, databaseName),
    WarrantyClaimCategory: require("./models/58.warrantyClaimCategory").init(sequelize, Sequelize, databaseName),
    SubletCode: require("./models/59.subletCode").init(sequelize, Sequelize, databaseName),
    WarrantyClaimType: require("./models/60.warrantyClaimType").init(sequelize, Sequelize, databaseName),
    WarrantyClaimRules: require("./models/62.warrantyClaimRules").init(sequelize, Sequelize, databaseName),
    WarrantyClaimRulesItem: require("./models/63.warrantyClaimRulesItem").init(sequelize, Sequelize, databaseName),
    QualityCheck: require("./models/64.qualityCheck").init(sequelize, Sequelize, databaseName),
    EVoucherList: require("./models/64.eVoucherList").init(sequelize, Sequelize, databaseName),
    Contract: require("./models/65.contracts").init(sequelize, Sequelize, databaseName),
    ContractUpload: require("./models/79.contractUpload").init(sequelize, Sequelize, databaseName),
    VehicleContract: require("./models/66.vehicleContracts").init(sequelize, Sequelize, databaseName),
    ContractRate: require("./models/67.contractRates").init(sequelize, Sequelize, databaseName),
    ContractType: require("./models/68.contractType").init(sequelize, Sequelize, databaseName),
    ContractInvoice: require("./models/96.contractInvoice").init(sequelize, Sequelize, databaseName),
    ContractInvoiceAmount: require("./models/97.contractInvoiceAmount").init(sequelize, Sequelize, databaseName),
    ContractInvoiceItem: require("./models/98.contractInvoiceItem").init(sequelize, Sequelize, databaseName),




    SplitShare: require("./models/69.splitShare").init(sequelize, Sequelize, databaseName),
    ProfitCenterGroup: require("./models/70.profitCenterGroup").init(sequelize, Sequelize, databaseName),
    CostCenterGroup: require("./models/71.costCenterGroup").init(sequelize, Sequelize, databaseName),
    ProfitCostCenterCategory: require("./models/72.profitCostCenterCategory").init(sequelize, Sequelize, databaseName),
    ProfitCenter: require("./models/73.profitCenter").init(sequelize, Sequelize, databaseName),
    CostCenter: require("./models/74.costCenter").init(sequelize, Sequelize, databaseName),
    EvoucherJobsParts: require("./models/75.eVoucherJobParts").init(sequelize, Sequelize, databaseName),
    Payment: require("./models/76.payment").init(sequelize, Sequelize, databaseName),
    PaymentItem: require("./models/77.paymentItem").init(sequelize, Sequelize, databaseName),

    WarrantyApproval: require("./models/78.warrantyApproval").init(sequelize, Sequelize, databaseName),
    WarrantyApprovalParts: require("./models/84.warrantyApprovalParts").init(sequelize, Sequelize, databaseName),
    WarrantyApprovalJobs: require("./models/81.warrantyApprovalJobs").init(sequelize, Sequelize, databaseName),
    ToolsAndEquipments: require("./models/76.toolsAndEquipments").init(sequelize, Sequelize, databaseName),
    ToolsAndEquipmentsAttachments: require("./models/77.toolsAndEquipmentsAttachments").init(sequelize, Sequelize, databaseName),
    ToolsAndEquipmentsHistory: require("./models/91.toolsAndEquipmentsHistory").init(sequelize, Sequelize, databaseName),
    ToolsAndEquipmentsAttachmentsHistory: require("./models/92.toolsAndEquipmentsAttachmentsHistory").init(sequelize, Sequelize, databaseName),
    WarrantyClaimHistoryStatus: require("./models/80.warrantyClaimHistoryStatus").init(sequelize, Sequelize, databaseName),
    WarrantyApprovalIncident: require("./models/82.warrantyApprovalIncident").init(sequelize, Sequelize, databaseName),
    WarrantyApprovalStatus: require("./models/83.warrantyApprovalStatus").init(sequelize, Sequelize, databaseName),
    WarrantyClaimIncident: require("./models/85.warrantyClaimIncident").init(sequelize, Sequelize, databaseName),
    PreRepairOrder: require("./models/87.PreRepairOrder").init(sequelize, Sequelize, databaseName),
    MaintenanceReminder: require("./models/86.maintenanceReminder").init(sequelize, Sequelize, databaseName),
    PreRepairOrderFlatRate: require("./models/88.preRepairOrderFlatRate").init(sequelize, Sequelize, databaseName),
    PreRepairOrderParts: require("./models/89.preRepairOrderParts").init(sequelize, Sequelize, databaseName),
    PreRepairOrderPackages: require("./models/90.preRepairOrderPackages").init(sequelize, Sequelize, databaseName),
    RepairOrderRemarks: require("./models/93.repairOrderRemarks").init(sequelize, Sequelize, databaseName),
    WarrantyClaimIncidentJobs: require("./models/94.warrantyClaimIncidentJobs").init(sequelize, Sequelize, databaseName),
    WarrantyClaimIncidentParts: require("./models/95.warrantyClaimIncidentParts").init(sequelize, Sequelize, databaseName),
    TechnicianProductivity: require("./models/100.technicianProductivity").init(sequelize, Sequelize, databaseName),
    Message: require("./models/101.message").init(sequelize, Sequelize, databaseName),
    WarrantyClaimAudit: require("./models/102.warrantyClaimAudit").init(sequelize, Sequelize, databaseName),
    RepairOrderPendingRemarks: require("./models/103.repairOrderPendingRemarks").init(sequelize, Sequelize, databaseName),
    JobDataUpload: require("./models/105.jobDataUpload").init(sequelize, Sequelize, databaseName),
    JobDataUploadFunction: require("./models/106.jobDataUploadFunction").init(sequelize, Sequelize, databaseName),
    JobDataUploadError: require("./models/107.jobDataUploadError").init(sequelize, Sequelize, databaseName),
    // RepairOrderSplitCharges: require("./models/104.repairOrderSplitCharges").init(sequelize, Sequelize, databaseName),
    SplitPart: require("./models/108.splitPart").init(sequelize, Sequelize, databaseName), 
    WipMovement: require("./models/109.wipMovement").init(sequelize, Sequelize, databaseName), 
};

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(models));

// Calling a function to create the indices
RepairOrderES.createTableOrIndex();
PreRepairOrderES.createTableOrIndex();
ServicePackageES.createTableOrIndex();

const db = {
    ...models,
    sequelize
};

module.exports = db;