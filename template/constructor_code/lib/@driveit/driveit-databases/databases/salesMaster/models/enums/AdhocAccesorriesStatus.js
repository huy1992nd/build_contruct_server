const EnumKeys = {
    NEW: 'new',
    WIP: 'wip',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
}

module.exports = {
    ...EnumKeys,
    status: Object.values(EnumKeys)
}