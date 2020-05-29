var _ = require('lodash');

const EnumKeys = {
    ENABLED: 'enabled',
    DISABLED: 'disabled',
    PENDING: 'pending',
}

const Types = {
    BOOLEAN: 'boolean',
    NUMBER: 'number',
    TEXT: 'text',
    SELECTION: 'selection'
}

const APPOINTMENT_KEYS = {
    NEW: "new",
    CONVERTED: "converted",
    CANCELLED: "cancel",
    NO_SHOW: "no_show"
}

const PRO_KEYS = {
    NEW: "new",
    CONVERTED: "converted",
    NO_SHOW: "no_show"
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
    QC_CHECKED: "qc_checked",
    CONFIRMED: "confirmed",
    INVOICED: "invoiced",
    DELIVERED: "delivered",
    CLOSED: "closed", 
    REJECTED: "rejected",
}


const ROINVOICE_KEYS = {
    FINAL: "final",
    PAID: "paid",
    CANCELLED: "cancelled",
}

const ROINVOICE_TYPE = {
    SERVICETAX: "servicetax",
    COMMERCIAL: "commercial"
}


module.exports = {
    ...EnumKeys,
    ...APPOINTMENT_KEYS,
    ...PRO_KEYS,
    ...RO_KEYS,
    ...Types,
    ROINVOICE_KEYS,
    appointmentStatus: Object.values(APPOINTMENT_KEYS),
    proStatus: Object.values(PRO_KEYS),
    roStatus: Object.values(RO_KEYS),
    ROINVOICE_TYPE,
    status: _.values(EnumKeys),
    type: _.values(Types),
    roInvoiceStatus: _.values(ROINVOICE_KEYS),
    roInvoiceTypes: _.values(ROINVOICE_TYPE),
}