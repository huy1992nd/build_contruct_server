const EnumKeys = {
    EXIST: 'Yes',
    NOTEXIST: 'No',
};

module.exports = {
    ...EnumKeys,
    status: Object.values(EnumKeys)
};