var _ = require('lodash');

const EnumKeys = {
    ENABLED: 'enabled',
    DISABLED: 'disabled',
    PENDING: 'pending',
}
const PoStatus = {
    PENDING: 'Pending',
    GENERATED: 'Generated',
    INVOICED: 'Invoiced',
    CANCELLED: 'Cancelled'
}
const PoItemStatus = {
    ENABLED: 'enabled',
    DISABLED: 'disabled',
    PENDING: 'pending',
    NAVISION_SYNCED: 'navision_synced',
}
const APPOINTMENT_KEYS = {
    NEW: "new",
    CONVERTED: "converted",
    CANCELLED: "cancel",
    NO_SHOW: "no_show"
}

const PACKAGE_STATUS = {
    NEW: "new",
    RELEASED: "released",
    BLOCKED: "blocked",
}
const PRO_KEYS = {
    NEW: "new",
    CONVERTED: "converted",
    NO_SHOW: "no_show"
}

const PO_GENERATION = {
    YES: "YES",
    NO: "NO"
}
const CAR_WASH_ACTION = {
    WAITING: 'waiting',
    CLOCK_IN: 'clock_in',
    CLOCK_OUT: 'clock_out'
}

const RO_STATUS_NEW = {
    NEW: "new",
    RELEASED: "released",
    WORK_IN_PROGRESS: "work_in_progress",
    PENDING_QC: "pending_qc",
    QC_PASSED: "qc_passed",
    QC_FAILED: 'qc_failed',
    REJECTED: "rejected",
    CAR_WASHED: "car_washed",
    CONFIRMED: "confirmed",
    INVOICED: "invoiced",
    DELIVERED: "delivered",
    CLOSED: "closed"
}

const RO_KEYS = {
    NEW: "new",
    RELEASED: "released",
    WORK_IN_PROGRESS: "work_in_progress",
    DISMANTLING: "dismantling",
    BODY_REPAIRING: "body_repairing",
    SURFACE_REPAIRING: "surface_repairing",
    PAINTING: "painting",
    REASSEMBLY: "reassembly",
    POLISHING: "polishing",
    QC_PASSED: "qc_passed",
    QC_CHECKED: "qc_checked",
    PO_PENDING: "po_pending",
    PO_GENERATED: "po_generated",
    PENDING_QC: "pending_qc",
    CONFIRMED: "confirmed",
    INVOICED: "invoiced",
    DELIVERED: "delivered",
    CLOSED: "closed",
    REJECTED: "rejected",
    COMPLETED: "completed",
    CAR_WASHED: "car_washed",
    RETURNED: "returned",
    ISSUED: "issued",
    PAUSE: "pause",
    WAITING_FOR_PARTS: "waiting_for_parts",
    WAITING_FOR_REAPIRSUPPORT: "waiting_for_reapirSupport",
    WAITING_FPR_APPROVAL: "waiting_fpr_approval",
    ANOTHER_JOB_APPOINTMENT: "another_job_appointment"
}

const JOB_KEYS = {
    NEW: "new",
    WORK_IN_PROGRESS: "work_in_progress",
    DISMANTLING: "dismantling",
    BODY_REPAIRING: "body_repairing",
    SURFACE_REPAIRING: "surface_repairing",
    PAINTING: "painting",
    REASSEMBLY: "reassembly",
    POLISHING: "polishing",
    PO_PENDING: "po_pending",
    PO_GENERATED: "po_generated",
    COMPLETED: "completed",
    PAUSE: "pause",
    WAITING_FOR_PARTS: "waiting_for_parts",
    WAITING_FOR_REPAIRSUPPORT: "waiting_for_repairSupport",
    WAITING_FOR_APPROVAL: "waiting_for_approval",
    ANOTHER_JOB_APPOINTMENT: "another_job_appointment"
}

const warrantyStatuses = {
    New: 'New',
    Claim_Created: 'Claim_Created'
}
const recallStatuses = {
    CLAIM_CREATED: 'Claim_Created',
    NEW: 'New',
    IN_PROCESS: 'In Process',
    COMPLETED: 'Completed',
    EXPIRED: 'Expired'
}

const ROINVOICE_KEYS = {
    FINAL: "final",
    PAID: "paid",
    CANCELLED: "cancelled",
    UNPAID: "unpaid",
    NEW:"new"
}

const ROINVOICE_TYPE = {
    SERVICETAX: "servicetax",
    COMMERCIAL: "commercial"
}

const CONTRACTINVOICESTATUS = {
    FINAL: "final",
    PAID: "paid",
    UNPAID: "unpaid",
    CANCELLED: "cancelled",
    PREVIEW: "preview"
}

const CONTRACTINVOICE_BILLINGTYPE = {
    LEASING: "leasing",
    CUSTOMER: "customer"
}

const TOOLSANDEQUIPMENTS_STATUS = {
    ACTIVE: "active",
    INACTIVE: "inactive",
    LOANTO: "loanto",
    RETURN: "return"
}

const PAYMENTSTATUS = {
    OPEN: "open",
    CLOSED: "closed",
    CANCELLED: "cancelled",
}

const WARRANTYCLAIMSTATUS = {
    NEW: "new",
    PENDING_HQ: "pending_hq",
    APPROVED_HQ: "approved_hq",
    REJECTED_HQ: "rejected_hq",
    RETURNED_HQ: "returned_hq",
    PENDING_REIMBURSER: "pending_reimburser",
    APPROVED_REIMBURSER: "approved_reimburser",
    REJECTED_REIMBURSER: "rejected_reimburser",
    RETURNED_REIMBURSER: "returned_reimburser"
}

const WARRANTY_APPROVAL_STATUS = {
    NEW: "New",
    APPROVED: "Approved",
    PENDING: "Pending",
    RETURN: "Returned",
    REJECT: "Rejected",
    CLOSED: "Closed",
    CANCELLED: "Cancelled"
};

const WARRANTY_CLAIM_ACTION = {
    BRANCH_SUBMISSION: "branch_submission",
    HQ_REJECT: "hq_reject",
    HQ_RETURN: "hq_return",
    HQ_APPROVED: "hq_approved",
    HQ_SUBMISSION: "hq_submission",
    REIMBURSER_REJECT: "reimburser_reject",
    REIMBURSER_RETURN: "reimburser_return",
    REIMBURSER_APPROVED: "reimburser_approved",
}

const TYPE_JOB_DATA_UPLOAD_FUNCTION = {
    SHARED: 'shared',
    SALES: 'sales',
    SERVICE: 'service'
}

const UploadStatus = {
    SUCCESS: 'success',
    FAILED: 'failed'
}

const PART_STATUS = {
    NEW: "new",
    PENDING_RETURN: "pending_return",
    PENDING: "pending",
    RESPOND: "respond",
    ISSUED: "issued",
    RETURNED: "returned"
}

module.exports = {
    ...EnumKeys,  // for default values
    ...APPOINTMENT_KEYS,
    ...PRO_KEYS,
    ...RO_KEYS,
    ...RO_STATUS_NEW,
    ...CAR_WASH_ACTION,
    ...PO_GENERATION,
    ...PACKAGE_STATUS,
    ...TOOLSANDEQUIPMENTS_STATUS,
    ...WARRANTYCLAIMSTATUS,
    ...WARRANTY_CLAIM_ACTION,
    ...CONTRACTINVOICESTATUS,
    ...CONTRACTINVOICE_BILLINGTYPE,
    PART_STATUS,
    partStatus: Object.values(PART_STATUS),
    ROINVOICE_KEYS,
    PoStatus,
    PoItemStatus,
    appointmentStatus: Object.values(APPOINTMENT_KEYS),
    proStatus: Object.values(PRO_KEYS),
    roStatus: Object.values(RO_KEYS),
    jobStatus: Object.values(JOB_KEYS),
    roStatusNew: Object.values(RO_STATUS_NEW),
    carWashActions: Object.values(CAR_WASH_ACTION),
    poGeneration: Object.values(PO_GENERATION),
    ROINVOICE_TYPE,
    status: _.values(EnumKeys),
    postatus: _.values(PoStatus),
    poItemstatus: _.values(PoItemStatus),
    recallStatuses: _.values(recallStatuses),
    roInvoiceStatus: _.values(ROINVOICE_KEYS),
    warrantyStatuses: _.values(warrantyStatuses),
    roInvoiceTypes: _.values(ROINVOICE_TYPE),
    packageStatus: _.values(PACKAGE_STATUS),
    toolsAndEquipmentStatus: _.values(TOOLSANDEQUIPMENTS_STATUS),
    PAYMENTSTATUS,
    status: Object.values(EnumKeys),
    postatus: Object.values(PoStatus),
    recallStatuses: Object.values(recallStatuses),
    roInvoiceStatus: Object.values(ROINVOICE_KEYS),
    warrantyStatuses: Object.values(warrantyStatuses),
    roInvoiceTypes: Object.values(ROINVOICE_TYPE),
    packageStatus: Object.values(PACKAGE_STATUS),
    paymentStatus: Object.values(PAYMENTSTATUS),
    warrantyClaimStatus: Object.values(WARRANTYCLAIMSTATUS),
    warrantyClaimAction: Object.values(WARRANTY_CLAIM_ACTION),
    WARRANTY_APPROVAL_STATUS: Object.values(WARRANTY_APPROVAL_STATUS),
    contractInvoiceStatus: Object.values(CONTRACTINVOICESTATUS),
    contractInvoiceType: Object.values(ROINVOICE_TYPE),
    contractInvoiceBillingType: Object.values(CONTRACTINVOICE_BILLINGTYPE),
    typeJobUploadFunction: Object.values(TYPE_JOB_DATA_UPLOAD_FUNCTION),
    uploadStatus: [UploadStatus.SUCCESS,UploadStatus.FAILED],
}