const ContactInfo = require("./ContactInfo");
const NotFoundError = require("./error/NotFoundError");
const ValidationError = require("./error/ValidationError");
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
    try{
      if(typeof newValue != 'string'){
        throw new  ValidationError("new value must be string")
    }
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
          throw new  Error("Error in UpdateContact Default")
      }
    }
    catch(rasi){
      console.log(rasi);
      console.log(rasi.message);
      
    }
    }
    createContactInfo(typeofContactInfo, valueOfContactInfo) {
      try{
        //if(this.isAdmin){return "Admin cannot create contacts"}
      let contactInfoObj = new ContactInfo(typeofContactInfo, valueOfContactInfo);
      this.contactInfo.push(contactInfoObj);
      return contactInfoObj;
      // let contactDetailsObj = new typeOfContactDetails()
      // this.contactDetails.push(contactDetailsObj)
      }
      catch(DipikaAdak){
        console.log(DipikaAdak);
        console.log(DipikaAdak.message);
      }
      
    }

     findContactInfo(contactInfoID){
      try{
        for (let i=0; i < this.contactInfo.length; i++) {
          if (this.contactInfo[i].id == contactInfoID){
              return i
          }
      }
      throw new NotFoundError("Error in Contact Details")
      }
      catch(nishu){
        console.log(nishu);
        console.log(nishu.message);
      }
      

  }
     updateContactInfo(contactInfoID, typeofContactInfo, valueOfContactInfo) {
        
     try{
      letindexOfContact = this.findContactInfo(contactInfoID);
      // if (!isContactExist) {
      //     return "Contact Does not Exist";
      // }
      return this.contactInfo[indexOfContact].updateContactInfo(typeofContactInfo, valueOfContactInfo)
     }
     catch(rasikapatil){
      throw rasikapatil
  }

}
    deleteContactInfo(contactInfoID) {
     try{
      let indexOfContact = this.findContactInfo(contactInfoID);
      // if (!isContactExist) {
      //   throw new  NotFoundError("Contact Does not Exist");
      // }
      this.contactInfo.splice(indexOfContact, 1)
      return this.contactInfo
     }
     catch(hiebuddy){
      console.log(hiebuddy);
      console.log(hiebuddy.message);
     }
}

getAllContactInfo(){
  try{
  return this.contactInfo
}
  catch(a){
    console.log(a);
    console.log(a.message);
  }
}

    getContactInfoByID(contactInfoID){
      try{
        let indexOfContact = this.findContactInfo(contactInfoID);
      // if (!isContactExist){
      //   throw new ValidationError ("Contact Info ID invalid")
      // }
      return this.contactInfo[indexOfContact]
      }
      catch(sonny){
        console.log(sonny);
        console.log(sonny.message);
      }
    }

  }

  module.exports = Contact