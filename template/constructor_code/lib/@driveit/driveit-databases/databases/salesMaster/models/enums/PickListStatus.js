const EnumKeys = {
    NEW: 'new',
    ISSUED: 'issued',
    WITHDRAWN: 'withdrawn ',
    RECEIVED: 'received'
}

module.exports = {
    ...EnumKeys,
    status: Object.values(EnumKeys)
}