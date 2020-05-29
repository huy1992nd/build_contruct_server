const EnumKeys = {
    NEW: 'new',
    ONGOING: 'ongoing',
    CLOSED: 'closed',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PENDING: 'pending',
}

module.exports = {
    ...EnumKeys,
    status: Object.values(EnumKeys)
}