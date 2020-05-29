const EnumKeys = {
    ENABLED: 'enabled',
    DISABLED: 'disabled'
};

module.exports = {
    ...EnumKeys,
    status: Object.values(EnumKeys)
};