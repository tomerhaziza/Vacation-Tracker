let ErrorType = {

    GENERAL_ERROR: { id: 1, httpCode: 600, message: "A general error ....", isShowStackTrace: true },
    UNAUTHORIZED: { id: 2, httpCode: 401, message: "Login failed, invalid user name or password", isShowStackTrace: false },
    USER_NAME_ALREADY_EXIST: { id: 3, httpCode: 601, message: "User name already exist", isShowStackTrace: false },
    VACATION_ALREADY_EXIST: { id: 4, httpCode: 602, message: "Vacation already exist", isShowStackTrace: false },
}

module.exports = ErrorType;