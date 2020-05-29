var _ = require('lodash');

const EnumKeys = {
    ENABLED: 'enabled',
    DISABLED: 'disabled',
    PENDING: 'pending'
}

const MONTH = {
    JANUARY: '1',
    FEBRUARY: '2',
    MARCH: '3',
    APRIL: '4',
    MAY: '5',
    JUNE: '6',
    JULY: '7',
    AUGUST: '8',
    SEPTEMBER: '9',
    OCTOBER: '10',
    NOVEMBER: '11',
    DECEMBER: '12',
}
const ACTION = {
    INSERT: 'insert',
    DELETE: 'delete',
    NA: 'N/A'
}
const FORECASTSTATUS = {
    ENABLED: 'enabled',
    DISABLED: 'disabled',
    PENDING: 'pending',
    NEW: 'new',
    ONGOING: 'ongoing',
    CLOSED: 'closed',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PENDING: 'pending'
}

const FORECASTDATATYPE = {
    N: 'n',
    N1: 'n1',
    N2: 'n2'
}

const FORECASTVIEWTYPE = {
    HQ: 'hq',
    COMPANY: 'company',
    DEALER: 'dealer',
    BRANCH: 'branch',
}

const TRANSFERSTATUS = {
    NEW: 'new',
    ONGOING : 'ongoing',
    CLOSED : 'closed',
    CANCEL : 'cancel',
    RETURN : 'return',
    REJECTED : 'rejected',
}

const ACKNOWLEDGESTATUS = {
    NEW: 'new',
    PENDINGARRIVAL : 'pending_arrival',
    CLOSED : 'closed',
    REJECTED : 'rejected'
}

const JVSSTATUS = {
    APPROVED: 'approved',
    WITHHELD : 'withheld',
    RELEASE : 'release',
    PAID : 'paid'
}

const JVSTRANSACTIONTYPE = {
    AUTO: 'auto',
    MANUAL : 'manual',
}

const JVSTRANSACTIONSTATUS = {
    CLOSED: 'closed',
    ACTIVE: 'active',
    INACTIVE : 'inactive',
}

const EXCISEPAYMENTSTATUS = {
    ALLOCATED: 'allocated',
    PENDINGPAYMENT: 'pending_payment',
    PENDINGVERIFICATION: 'pending_verification',
    PENDINGSUBMISSION : 'pending_submission',
    NEW: 'new',
    SUBMITTED: 'submitted',
    SUCCEEDED: 'succeeded',
    FAILED: 'failed'
}

const EXCISEENDORSEMENTSTATUS = {
    FAILED: 'fal',
    NEW: 'new',
    SUBMITTED: 'sbm',
    SUCCEEDED: 'suc',
    CANCELLED: 'xcl',
    NEW_CANCELLATION: 'xnw',
    SUBMITTED_CANCELLATION: 'xsb',
}

const LPOSTATUS = {
    NEW: 'new',
    INVOICED: 'invoiced',
    CANCELLED: 'cancelled'
}

module.exports = {
    ...EnumKeys,
    status: [EnumKeys.ENABLED, EnumKeys.DISABLED, EnumKeys.PENDING],
    MONTH,
    month: _.values(MONTH),
    FORECASTSTATUS,
    forecastStatus: _.values(FORECASTSTATUS),
    FORECASTDATATYPE,
    forecastDataType: _.values(FORECASTDATATYPE),
    FORECASTVIEWTYPE,
    forecastViewType: _.values(FORECASTVIEWTYPE),
    TRANSFERSTATUS,
    transferStatus: _.values(TRANSFERSTATUS),
    ACKNOWLEDGESTATUS,
    acknowledgeStatus: _.values(ACKNOWLEDGESTATUS),
    JVSSTATUS,
    jvsStatus: [JVSSTATUS.APPROVED, JVSSTATUS.WITHHELD, JVSSTATUS.RELEASE, JVSSTATUS.PAID],
    JVSTRANSACTIONTYPE,
    
    jvsTransactionType: [JVSTRANSACTIONTYPE.AUTO, JVSTRANSACTIONTYPE.MANUAL],
    JVSTRANSACTIONSTATUS,
    JvsTransactionStatus: [JVSTRANSACTIONSTATUS.CLOSED, JVSTRANSACTIONSTATUS.ACTIVE, JVSTRANSACTIONSTATUS.INACTIVE],
    EXCISEPAYMENTSTATUS,
    excisePaymentStatus: _.values(EXCISEPAYMENTSTATUS),
    ACTION,
    actionMode: _.values(ACTION),
    EXCISEENDORSEMENTSTATUS,
    exciseEndorsementStatus: _.values(EXCISEENDORSEMENTSTATUS),
    lpoStatus: _.values(LPOSTATUS),
}