const EnumKeys = {
    NEW: 'new',
    INVOICED: 'invoiced',
    DELIVERED: 'delivered',
    VOIDED: 'voided',
    CANCELLED: 'cancelled',
}

const EnumKeys2 = {
    USEDVEHICLEDEALER: 'Used Vehicle Dealer',
    AUCTION: 'Auction',
    RETAILCUSTOMER: 'Retail Customer'
}

module.exports = {
    ...EnumKeys,
    ...EnumKeys2,
    statuses: Object.values(EnumKeys),
    disposalManner: Object.values(EnumKeys2)
}