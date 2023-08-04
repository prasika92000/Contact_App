const BaseError = require("./BaseError");

class ValidationError extends BaseError{
    constructor(specificMessage){
        super("Validation Error" , 400, specificMessage)

    }
}
module.exports = ValidationError