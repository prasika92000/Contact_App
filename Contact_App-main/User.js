
const Contact = require("./Contact");
const { contactInfoID } = require("./ContactInfo");

class User{
    static allUsers = [] 
    static id=0
    constructor(fullName, isAdmin,gender,age) { 
        this.fullName = fullName ;
        this.isAdmin = isAdmin; 
        this.id = User.id++ ;
        this.gender = gender;
        this.age = age;
        this.Contacts = [];

        // User.allUsers.push(this); //add the current user object to the all users array
    } 
 
    newUser(fullName,gender,age) { 
        if (typeof fullName != "string") { 
            return "Invalid FullName!!" 
        } 
        if (!this.isAdmin) { 
            return "Error,Not Authorized" 
        } 
        
        let userObj = new User(fullName, false,gender,age) //for creating new user
        User.allUsers.push(userObj) 
        return userObj 
    } 
 
    static newAdmin(fullName,gender,age) { 
        if (typeof fullName != "string") { 
            return "Invalid FullName" 
        } 
 
        return new User(fullName, true,gender,age) 
    } 
    getAllUsers(){ 
        if (!this.isAdmin){ return "Not Authorized"} 
        return User.allUsers
        
    } 
    findUser(ID){
        for(let index = 0; index < User.allUsers.length;index++){
            if(ID == User.allUsers[index].ID){
                return [index,true]
            }
        }
        return[-1,true]
    }
    updateUser(ID,parameter,newValue){
        //validation id
        if(!this.isAdmin){ return "Not Authorized"}
        
        let[indexOfUser, isUserExist] = User.findUser(ID)
        if(!isUserExist){ return "User Not Authorized"}
       
        switch(parameter){
            case "fullName" : 
            if (typeof newValue !== "string" || newValue.trim() === "") {
                return "Invalid Full Name";
            }
            User.allUsers[indexOfUser].fullName = newValue
            return User.allUsers[indexOfUser]
           
            case "gender" :
            if (typeof newValue !== "string" || !["male", "female", "other"].includes(newValue.toLowerCase()))   
            return User.allUsers[indexOfUser]
           
            case "age" :  
            if (typeof newValue !== "number" || isNaN(newValue) || newValue < 0) 
            User.allUsers[indexOfUser].age = newValue
            return User.allUsers[indexOfUser]
            default:
              return "Invalid Parameter"
          }
    }
    deleteUser(ID){
        if (!this.isAdmin) {
            return "Not Authorized";
        }

        let [indexOfUser, isUserExist] = this.findUser(ID);
        if (!isUserExist) {
            return "User Not Found";
        }

        User.allUsers.splice(indexOfUser, 1); //splice is used to modigy or delete (indexposition , element in this index)
        return "User Deleted Successfully";
       
    }
    createContact(contactName, country,email){
        if (this.isAdmin){return "Admin cannot create contacts"}
        if (typeof contactName != 'string'|| contactName.trim() === "") 
        {
            return "Invalid Contact Name";
        }

        let contactObj =new Contact(contactName, country,email)
        this.Contacts.push(contactObj)
        return contactObj
    }
    getAllContact() {
        if (this.isAdmin) {
            return "Admin does not have Contacts";
        }

        return this.Contacts;
    }
    findContact(contactID) {
        for (let index = 0; index < this.Contacts.length; index++) {
            if (this.Contacts[index].id == contactID) {
                return [index, true];
            }
        }
        return [-1, false];
    }

    updateContact(contactID,parameter,newValue){
        if(this.isAdmin){
            return "Failure"
        }
        let [indexOfContact, isContactExist] = this.findContact(contactID)
        console.log("index",indexOfContact);
        if (!isContactExist){
            return "Failuree"
        }
        
        return this.Contacts[indexOfContact].updateContact(parameter, newValue)
        
    }
    deleteContact(contactID){
        if(this.isAdmin){return "Admin cannot create contacts"}

        let [indexOfContact, isContactExist] = this.findContact(contactID);
        if (!isContactExist) {
            return "Contact Does not Exist";
        }
        this.Contacts.splice(indexOfContact, 1);  
        return this.Contacts
        //return "Contact Deleted Successfully";
    }

    createContactInfo(contactID, typeofContactInfo, valueOfContactInfo) {
        if (this.isAdmin) {
            return "Admin cannot create contact info";
        }

        let [indexOfContact, isContactExist] = this.findContact(contactID);
        if (!isContactExist) {
            return "Contact Does not Exist";
        }

        return this.Contacts[indexOfContact].createContactInfo(typeofContactInfo, valueOfContactInfo);
    }
    findContactInfo(contactInfoID){
        for (let i=0; i < this.contactInfo.length; i++) {
            if (this.contactInfo[i].ID == contactInfoID){
                return [i, true]
            }
        }
        return [-1, false]
    }
    getAllContactInfo(ContactID){
        if(this.isAdmin){
            return "Failure"
        }
        let[indexOfContact, isContactExist] = this.findContact(ContactID)
        if(! isContactExist){
            return "Failure"
        }
        return this.Contacts[indexOfContact].getAllContactInfo()
    }
    updateContactInfo(ID,contactInfoID,typeofContactInfo, valueOfContactInfo){
        if(this.isAdmin){ return "Not Authorized"}
        
        let [indexOfContact, isContactExist] = this.findContact(ID);
        if (!isContactExist) {
            return "Contact Does not Exist";
        }

        return this.Contacts[indexOfContact].updateContactInfo(contactInfoID,typeofContactInfo, valueOfContactInfo)
} 
    deleteContactInfo(ID,contactInfoID){
        if(this.isAdmin){ return "Not Authorized"}

        let [indexOfContact, isContactExist] = this.findContact(ID);
        if (!isContactExist) {
            return "Contact Does not Exist";
        }

        return this.Contacts[indexOfContact].deleteContactInfo(contactInfoID)
    }
    getContactInfoByID(ContactID, contactInfoID){
        if (this.isAdmin){
            return "Only Users can access Contacts-Info"
        }

       let [index, isContactExist] = this.findContact(ContactID);
        if (!isContactExist) {
            return "Contact Does not Exist";
        }
        
        let info = this.Contacts[index].getContactInfoByID(contactInfoID)
    //    console.log("11", this.contacts[indexOfUser]);
        return info
    }

}
 
let adminObj = User.newAdmin("rasika" ,"female", 23) //
let user1 = adminObj.newUser("Pratham", "Male", 34)
let user2 = adminObj.newUser("neha", "Female", 40)
let user3 = adminObj.newUser("yash", "Male", 24)
// let user1=adminObj.newUser("neha", "female" , 45)
// let user2 = user1.newUser("sanu","female" , 30) //creating user2 through user1 so it will give error
// let user3 = adminObj.newUser("parth","male" , 18)  //creating user3 through admin(adminObj) so it will give true output
console.log(adminObj.getAllUsers());//for all users
//let user1=adminObj.newUser("neha")
//console.log(user1.getAllUsers());//[] Not Authorized

console.log(user1.createContact("Siddh", "IND", "sidd@gmail.com"))
console.log(user1.createContact("lina", "USA", "lina@gmail.com"))
console.log(user1.createContact("zaid", "AUS", "zaid@gmail.com"))
console.log(user1.getAllContact())
console.log(user1.updateContact(1, "contactName", "Tanuja"))
console.log(user1.getAllContact())
console.log("Delete Contact: ", user1.deleteContact(2))


console.log(user1.deleteContact(2))
console.log("all contact after deleting contact " ,user1.getAllContact())

console.log(user1.createContactInfo(1, "phoneNo", "8790456734" )) 
console.log(user1.createContactInfo(1, "country", "IND" )) 
console.log(user1.getAllContactInfo(1));
// console.log(user1.updateContactInfo(1, 1,"valueOfContactdetails", "8287389909"))
console.log("delete contact info by id ",user1.deleteContactInfo(1, 1));

console.log("--------------------------------------------------------");
 console.log("All contact Information" ,user1.getAllContactInfo(1));
 console.log("Before Updating: ", user1.getContactInfoByID(1, 2));
 console.log("After Updating: ",user1.updateContactInfo(1, 2, "value", "USA"));
//console.log("deleted contact " ,user1.deleteContactInfo(0, 1));
console.log();

// console.log(adminObj);   //User { fullName: 'rasika', isAdmin: true, id: 0 }
// console.log(user1);      //User { fullName: 'neha', isAdmin: false, id: 2 } 
// console.log("user2 output " +user2);      //Error
// console.log(user3);      //User { fullName: 'parth', isAdmin: false, id: 1 }


module.exports = User

//admin--getUserByID

//user--getContactById;
 //     -getContactInfoById
//  let adminObj = User.newAdmin("rasika") 
 
// let user3 = adminObj.newUser("parth")  //creating user3 through admin(adminObj) so it will give true output

// let user2 = user1.newUser("sanu") //creating user2 through user1 so it will give error