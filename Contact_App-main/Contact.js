const ContactInfo = require("./ContactInfo")
class Contact {
    static ID = 1
    constructor(contactName, country,email) {
      this.id = Contact.ID++
      this.contactName = contactName;
      this.country = country;
      this.email = email
      this.contactInfo = [];
      
    }
    updateContact(parameter,newValue){
      switch(parameter){
        case "contactName" :  
        this.contactName = newValue
        return this
        case "country" :   
        this.country = newValue
        return this
        case "email" :   
        this.email = newValue
        return this
        default:
          return "Invalid Parameter"
      }
    }
    createContactInfo(typeofContactInfo, valueOfContactInfo) {
      if(this.isAdmin){return "Admin cannot create contacts"}
      let contactInfoObj = new ContactInfo(typeofContactInfo, valueOfContactInfo);
      this.contactInfo.push(contactInfoObj);
      return contactInfoObj;
      // let contactDetailsObj = new typeOfContactDetails()
      // this.contactDetails.push(contactDetailsObj)
    }

     findContactInfo(contactInfoID){
      for (let i=0; i < this.contactInfo.length; i++) {
          if (this.contactInfo[i].id == contactInfoID){
              return [i, true]
          }
      }
      return [-1, false]
  }
     updateContactInfo(contactInfoID, typeofContactInfo, valueOfContactInfo) {
        
      let [indexOfContact, isContactExist] = this.findContactInfo(contactInfoID);
      if (!isContactExist) {
          return "Contact Does not Exist";
      }

      return this.contactInfo[indexOfContact].updateContactInfo(typeofContactInfo, valueOfContactInfo)
  
}
    deleteContactInfo(contactInfoID) {

      let [indexOfContact, isContactExist] = this.findContactInfo(contactInfoID);
      if (!isContactExist) {
          return "Contact Does not Exist";
      }
      this.contactInfo.splice(indexOfContact, 1)
      return this.contactInfo
}

getAllContactInfo(){
  return this.contactInfo
}

    getContactInfoByID(contactInfoID){
      let [indexOfContact, isContactExist] = this.findContactInfo(contactInfoID);
      if (!isContactExist){
        return "Contact Info ID invalid"
      }
      return this.contactInfo[indexOfContact]
    }

  }

  module.exports = Contact