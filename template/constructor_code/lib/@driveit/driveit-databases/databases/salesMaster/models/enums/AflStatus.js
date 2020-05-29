const EnumKeys = {
    CANCELLED: 'cancelled',
    COMPLETED: 'completed',
    MEP: 'mep',
    NEW: 'new',
    NEW_CBJ: 'new-cbj',
    NEW_PENDINGCBJ: 'new-pending-cbj',
    WIP: 'wip',
    WIP_CBJ: 'wip-cbj',
    WIP_PENDINGCBJ: 'wip-pending-cbj',
}

module.exports = {
    ...EnumKeys,
    status: Object.values(EnumKeys)
}