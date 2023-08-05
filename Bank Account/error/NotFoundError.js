const BaseError = require("./BaseError")
class NotFoundError extends BaseError{
    constructor(specificMessage){
        super("NotFoundError", "element not found", 404)
        this.specificMessage = specificMessage
    }
}

module.exports = NotFoundError