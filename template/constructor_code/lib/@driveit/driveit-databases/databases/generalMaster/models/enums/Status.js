const EnumKeys = {
    ENABLED: 'enabled',
    DISABLED: 'disabled',
    PENDING: 'pending'
};
const ADJUSTMENT_KEYS = {
    NEW: 'new',
    PENDING: 'pendingApproval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
}

const SYNC_STATUS = {
    FAILED: 'failed',
    PENDING: 'pending',
    SUCCESS: 'success',
}

const navistionHistoryTypes = {
    JVS: 'JVS',
    PO: 'PURCHASE_ORDER'
}

module.exports = {
    ...EnumKeys,
    status: [
        EnumKeys.ENABLED,
        EnumKeys.DISABLED,
        EnumKeys.PENDING
    ],
    ADJUSTMENT_KEYS,
    adjustmentStatus: Object.values(ADJUSTMENT_KEYS),
    ...SYNC_STATUS,
    syncStatus: Object.values(SYNC_STATUS),
    navistionHistoryTypes: Object.values(navistionHistoryTypes),
    ...navistionHistoryTypes
};