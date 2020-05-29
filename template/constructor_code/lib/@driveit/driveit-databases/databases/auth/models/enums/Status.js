const EnumKeys = {
    ENABLED: 'enabled',
    DISABLED: 'disabled',
    PENDING: 'pending'
}

module.exports = {
    ...EnumKeys,
    status: [EnumKeys.ENABLED, EnumKeys.DISABLED, EnumKeys.PENDING]
}