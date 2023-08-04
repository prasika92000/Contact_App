const BaseError = require("./BaseError");

class UnauthorizedError extends BaseError{
    constructor(specificMessage){
        super("UnAuthorized Access " ,401 ,specificMessage)
    }
}
module.exports = UnauthorizedError