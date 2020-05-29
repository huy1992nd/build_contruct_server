const EnumTDOKeys = {
    BRANCH: '1',
    CONTRACTOR: '2',
}

module.exports = {
    ...EnumTDOKeys,
    tdoType: Object.values(EnumTDOKeys)
}