const EnumKeys = {
    ASSIGNED: 'assigned',
    CANCELLED: 'cancelled',
    NEW:'new'
}

module.exports = {
    ...EnumKeys,
    status: [EnumKeys.ASSIGNED, EnumKeys.CANCELLED]
}