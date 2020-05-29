const EnumKeys = {
    ALLOCATED: 'allocated',
    CANCEL: 'cancel',
    DELIVERED: 'delivered',
    HOLD: 'hold',
    INVOICED: 'invoiced',
    NEW: 'new',
    PENDING_REFUND: 'pending_refund',
    REGISTERED: 'registered',
    UNHOLD: 'unhold',    
}

module.exports = {
    ...EnumKeys,
    status: Object.values(EnumKeys)
}