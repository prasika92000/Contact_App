class BaseError extends Error{
    constructor(message,httpStatusCode,specificMessage){
        super(message)
        this.httpStatusCode = httpStatusCode
        this.specificMessage = specificMessage

    }
}
module.exports = BaseError