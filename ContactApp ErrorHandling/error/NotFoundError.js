const BaseError = require("./BaseError");

class NotFoundError extends BaseError{
    constructor(specificMessage){
        super("NotFoundError",404,specificMessage)
    }
}
module.exports = NotFoundError