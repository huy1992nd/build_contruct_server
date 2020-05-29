const EnumKeys = {
    DELETED: 'deleted',
    CANCELLED: 'cancelled',
    NEW: 'New'
};
const recallVehicleStatuses = {
    New: "New",
    In_Process: "In Process",
    Completed: "Completed",
    Expired: "Expired"
}
module.exports = {
    ...EnumKeys,
    ...recallVehicleStatuses,
    status: Object.values(EnumKeys),
    recallVehicleStatuses: Object.values(recallVehicleStatuses),

};