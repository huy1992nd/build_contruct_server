const EnumKeys = {
    NEW: 'new',
    WIP: 'wip',
    COMPLETED: 'completed',
    CANCELLED: 'cancel'
}

module.exports = {
    ...EnumKeys,
    status: Object.values(EnumKeys)
}