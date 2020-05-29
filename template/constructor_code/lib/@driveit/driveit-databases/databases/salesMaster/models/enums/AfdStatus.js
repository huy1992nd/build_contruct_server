const EnumKeys = {
    NEW: 'new',
    PRINTED: 'printed',
    COMPLETED: 'completed'
}

module.exports = {
    ...EnumKeys,
    status: Object.values(EnumKeys)
}