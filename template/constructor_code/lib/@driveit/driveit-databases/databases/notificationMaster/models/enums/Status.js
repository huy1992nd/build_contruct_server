const EnumKeys = {
    SUCCESS: 'success',
    FAILED: 'failed',
    PENDING: 'pending'
}

const NotificationTypes = {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push'
}

module.exports = {
    ...EnumKeys,
    status: [EnumKeys.SUCCESS, EnumKeys.FAILED, EnumKeys.PENDING],
    notificationTypes: [NotificationTypes.EMAIL, NotificationTypes.PUSH, NotificationTypes.SMS]

}