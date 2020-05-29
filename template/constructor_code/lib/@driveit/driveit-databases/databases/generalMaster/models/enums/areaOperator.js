const EnumKeys = {
    ENABLED: 'Enabled',
    DISABLED: 'Disabled',
};

module.exports = {
    ...EnumKeys,
    status: [
        EnumKeys.ENABLED,
        EnumKeys.DISABLED,
    ],
};