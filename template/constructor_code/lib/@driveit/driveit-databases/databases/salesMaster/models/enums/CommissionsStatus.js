const EnumKeys = {
    TRUE: true,
    FALSE: false
}

module.exports = {
    ...EnumKeys,
    status: Object.values(EnumKeys)
}