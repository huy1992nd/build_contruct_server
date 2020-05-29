const EnumKeys = {
    NEW: 'new',
    ONGOING: 'ongoing',
    CLOSED: 'closed',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PENDING: 'pending',
    CANCELWIP: 'cancel_wip',
    CANCELLED: 'cancel',
    ASSIGNED: 'assigned',
    WIP: 'wip',
    VERIFIED: 'verified'
}

module.exports = {
    ...EnumKeys,
    status: Object.values(EnumKeys)
}