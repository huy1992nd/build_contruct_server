const EnumKeys = {
    APPOINTMENT: 'appointment',
    BOOKING: 'booking',
    NEW: 'new',
    TEMP: 'temp',
    EMPTY: ''
}

module.exports = {
    ...EnumKeys,
    action: [EnumKeys.APPOINTMENT, EnumKeys.BOOKING, EnumKeys.NEW, EnumKeys.TEMP, EnumKeys.EMPTY]
}