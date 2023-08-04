const ValidationError = require("./error/ValidationError");

class ContactInfo {
    static contactInfoID= 1
      constructor(typeOfContactInfo, valueOfContactInfo) {
        this.id = ContactInfo.contactInfoID++
        this.type = typeOfContactInfo;
        this.value = valueOfContactInfo
      }
      updateContactInfo(parameterContactInfo, valueOfContactInfo) {
    
        if (parameterContactInfo === 'type') {
            this.type = valueOfContactInfo;
        } else if (parameterContactInfo === 'value') {
            this.value = valueOfContactInfo;
        } else {
          throw new ValidationError("this is default")
        }
  
        return this;
    }
  }  
  module.exports = ContactInfo