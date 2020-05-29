"use stric"

//==================================
// login with user system
//==================================
exports.RegistDevice = {
    MSG_DEVICEID_EMPTY: 'Device is empty.',
    MSG_DEVICEID_SUCCESS: 'Register device individual success.'
}
exports.request ={
    GET_LIST_REQUEST: "Get List Request Success.",
    NOT_INPUT_STATUS: "Please Input Status.",
    MSG_NR_001: "Please input ",
    MSG_NR_002: "The Start date you entered occurs before the and date",
    MSG_NR_003: "not exist.",
    MSG_NR_004: "Please enter a date in YYYY-MM-DD format",
    MSG_ADDNEW_SUCCESS: "Add New request success"
}
exports.logout = {
    incorrectToken: "Incorect Token Device",
    logoutSuccess: "logout success",
    userNotFound: "user not found",
    logoutfail: "logout fail"
}


//==================================
// forgotPassword
//==================================
exports.forgotPassword = {
    invalidEmail: "Incorrect password. Please try again.",
    sentMailsuccess: "A temporary password has been sent to your email. Please check your email and login with the new password.",
    notExistingEmail: "Incorrect email. Please try again.",
    forgotPassError: "Sorry, an error has occurred. Please try again.",
}

exports.ActiveUserAcount = {
    success: "Your account has been successfully activated. Please logout and login in again on your mobile application.",
    error: "Incorrect Email/Token. Please contact the administrator for further assistance.",
    errorSys: "Incorrect Email/Token. Please contact the administrator for further assistance."

}

exports.Appointment = {
    requireUserId: 'Require user Id',
    requireTypeId: 'Require Type appointmentId',
    requireProviderId: 'ProviderId does not exist.',
    fileNotCorrect: 'URL not found',
    timeZoneInvalid: 'TimeZone invalid. Please try again',
    invalidDate: 'Date invalid, Please try again'
}

exports.messageCommon = {
    success: "Success.",
    error: "please contact with administrator.",
    paramsInvalid: 'Params incorrect. Please try again.',
    cannotSendSMS: 'Can not send SMS to phone',
    invalidEmail: 'Invalid email. please try again.',
    invalidDeviceId: 'Invalid device id. please try again.',
    INCORECT_TACCODE: "Invalid tac code. Please try again.",
    NOT_FOUND_TACCODE: "Sorry, we don't recognize this tac code. Please try again.",
}

exports.message = {
    INCORRECT_DATA:"Incorrect data",
    NAME_WRONG :"Name wrong",
    NAME_DUPLICATE :"Name duplicate",
    AGE_WRONG : "Age wrong",
    SEX_WRONG :"Sex wrong",
    BIRTH_DAY_WRONG :"Birth day wrong",
    PHONE_WRONG : "Phone wrong",
    ERROR: "Have some error",
    ADD_SUCCESS: "Add success",
    EDIT_SUCCESS: "Edit success",
    DELETE_SUCCESS: "Delete success",
  }
