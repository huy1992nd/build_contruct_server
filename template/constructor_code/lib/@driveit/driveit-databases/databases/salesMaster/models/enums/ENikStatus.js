const EnumKeys = {
    FAIL: 'fail',
    INCOMPLETE: 'incomplete',
    MISSING: 'missing',
    NEW: 'new',
    SUBMITTED: 'submitted',
    SUCCESS: 'success'
}

module.exports = {
    ...EnumKeys,
    status: Object.values(EnumKeys)
}