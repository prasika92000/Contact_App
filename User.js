const Contact = require("./Contact");
const { contactInfoID } = require("./ContactInfo");
const NotFoundError = require("./error/NotFoundError");
const UnauthorizedError = require("./error/UnauthorizedError");
const ValidationError = require("./error/ValidationError");

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
       try{
        if (typeof fullName != "string") { 
            throw new ValidationError
        } 
        if (!this.isAdmin) { 
            throw new  UnauthorizedError
        } 
        let userObj = new User(fullName, false,gender,age) //for creating new user
        User.allUsers.push(userObj) 
        return userObj 
       }
       catch(rasika){
         console.log(rasika.message);
        console.log(rasika.specificMessage);
        console.log("hee rasika here");   }
        
    } 
 
    static newAdmin(fullName,gender,age) { 
       try{
        if (typeof fullName != "string") { 
            throw new ValidationError 
        } 
        return new User(fullName, true,gender,age) 
       }
       catch(rasikapatil){
        onsole.log(rasikapatil.message);
        console.log(rasikapatil.specificMessage);
        console.log("hiee rasika patil here");
       }
       
    } 
    getAllUsers(){ 
        try{
            if (!this.isAdmin){ return UnauthorizedError} 
            return User.allUsers
        }
        catch(hellouser){
            console.log(hellouser.message);
            console.log(hellouser.specificMessage);
            console.log("helo user");
           }
        
    } 
    findUser(ID){
        try{
            for(let index = 0; index < User.allUsers.length;index++){
                if(ID == User.allUsers[index].ID){
                    return [index]
                }
        }
        throw new UnauthorizedError("User data found")
        }
        catch(welcome){
            console.log(welcome.message);
        console.log(welcome.specificMessage);
            console.log("welcome all");
        }

    }
    updateUser(ID,parameter,newValue){
      try{
        if(!this.isAdmin){ throw new  UnauthorizedError}
        let[indexOfUser] = User.findUser(ID)
       // if(!isUserExist){ return NotFoundError}
        
        switch(parameter){
            case "fullName" : 
            if (typeof newValue !== "string" || newValue.trim() === "") {
                throw new  ValidationError
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
                throw new  ValidationError("Error in UpdateContact Default")
          }
      }
      catch(e){
        console.log(e.message);
        console.log(e.specificMessage);
      }
       
    }
    deleteUser(ID){
        try{if (!this.isAdmin) {
            throw new  UnauthorizedError
        }

        let [indexOfUser] = this.findUser(ID);
        // if (!isUserExist) {
        //     throw new  NotFoundError
        // }

        User.allUsers.splice(indexOfUser, 1); //splice is used to modigy or delete (indexposition , element in this index)
        return "User Deleted Successfully";
    }
        catch(Sami){
            console.log(sami.message);
            console.log(Sami.specificMessage);

        }
       
    }
    createContact(contactName, country,email){
        try{
            if (this.isAdmin){return UnauthorizedError("Admin cannot create contacts")}
        if (typeof contactName != 'string'|| contactName.trim() === "") 
        {
            throw new  ValidationError("Invalid Contact Name")
        }

        let contactObj =new Contact(contactName, country,email)
        this.Contacts.push(contactObj)
        return contactObj
        }
        catch(m){
            console.log(m.message);
            console.log(m.specificMessage);

    }
    }
    getAllContact() {
       try{ if (this.isAdmin) {
        throw new  UnauthorizedError
    }

    return this.Contacts;}
    catch(Pratham){
            console.log(Pratham.message);
            console.log(Pratham.specificMessage);

    }
    }
    findContact(contactID) {
        try{
            for (let index = 0; index < this.Contacts.length; index++) {
                if (this.Contacts[index].id == contactID) {
                    return [index];
                }
        }
        throw new NotFoundError("Contact Not Found")
        } 
        catch(rasika){
            console.log("I am in catch of find contact");
            //console.log(rasika);
            throw (rasika)
    
           }
    }

    updateContact(contactID,parameter,newValue){
       try{
        if(this.isAdmin){
            throw new  UnauthorizedError("This is not an admin")
        }
        let [indexOfContact] = this.findContact(contactID)
        // console.log("index",indexOfContact);
        // if (!isContactExist){
        //     return "Failuree"
        
        return this.Contacts[indexOfContact].updateContact(parameter, newValue)
    }
    catch(Tanuja){
        console.log(Tanuja);
        console.log("I am in catch of update contact");
        console.log(Tanuja.message);
    }
       }
        
    deleteContact(contactID){
       try{
        if(this.isAdmin){return UnauthorizedError ("Admin cannot delete contacts")}

        let [indexOfContact,isContactExist] = this.findContact(contactID);//let [indexOfContact, isContactExist] = this.findContact(contactID);: 
                                                                           //This line calls the findContact function to search for the contact with the provided contactID. 
                                                                           //The findContact function returns an array with two elements: the index of the contact in the this.Contacts array
                                                                           // and a boolean value isContactExist indicating whether the contact with the given contactID exists or not.
         if (!isContactExist) {
            // throw new  NotFoundError ("Contact Does not Exist");
         }
        this.Contacts.splice(indexOfContact, 1);  
        return this.Contacts
        //return "Contact Deleted Successfully";
       }
       catch(soham){
        // console.log(soham);
        // console.log("I am in catch of delete contact");
        console.log(soham.message);
    }
       
    }

    createContactInfo(contactID, typeofContactInfo, valueOfContactInfo) {
      try{
        if (this.isAdmin) {
            throw new  UnauthorizedError("Error in Admin")
        }

        let [indexOfContact] = this.findContact(contactID);
        // if (!isContactExist) {
        //     throw new  UnauthorizedError("Error in Admin")
        // }

        return this.Contacts[indexOfContact].createContactInfo(typeofContactInfo, valueOfContactInfo);
      }
      catch(Dipika){
        console.log(Dipika);
        console.log("I am in catch of create contact info method");
        console.log(Dipika.message);

    }
}
    // findContactInfo(contactInfoID){
    //     for (let i=0; i < this.contactInfo.length; i++) {
    //         if (this.contactInfo[i].ID == contactInfoID){
    //             return [i, true]
    //         }
    //     }
    //     return [-1, false]
    // }
    getAllContactInfo(ContactID){
        try{
            if(this.isAdmin){
                throw new  UnauthorizedError
            }
            let[indexOfContact] = this.findContact(ContactID)
            // if(! isContactExist){
            //     throw new  NotFoundError
            // }
            return this.Contacts[indexOfContact].getAllContactInfo()
        }
        catch(yupp){
            console.log(yupp);
            console.log(yupp.message);
        }
    }
    updateContactInfo(ID,contactInfoID,typeofContactInfo, valueOfContactInfo){  //ID -contact -->id   contactinfoID-->contactinfoID
        try{
            if(this.isAdmin){  throw new UnauthorizedError("Admin does not exists")}
            if(typeof ID != 'number' || typeof contactInfoID != 'number'){
                throw new Error("this is a string")
            }
        
        let [indexOfContact] = this.findContact(ID);
        // if (!isContactExist) {
        //     return "Contact Does not Exist";
        // }
        return this.Contacts[indexOfContact].updateContactInfo(contactInfoID,typeofContactInfo, valueOfContactInfo)
        }
        catch(rasika){
            console.log("Rasika Catch");
            console.log(rasika.message);
            // console.log(rasika);
            // console.log(rasikastack);
            // console.log(rasika.name);
            // console.log(rasika.stack);
        }
  
} 
    deleteContactInfo(ID,contactInfoID){
        try{
            if(this.isAdmin){ throw new  UnauthorizedError}

        let [indexOfContact] = this.findContact(ID);
        // if (!isContactExist) {
        //     throw new  NotFoundError("Contact Does not Exist");
        // }

        return this.Contacts[indexOfContact].deleteContactInfo(contactInfoID)
        }
        catch(rasikap){
            console.log("Rasika Catch");
            console.log(rasikap.message);
    }
}
    getContactInfoByID(ContactID, contactInfoID){
        try{if (this.isAdmin){
            throw new  UnauthorizedError("Only Users can access Contacts-Info")
        }

       let [index] = this.findContact(ContactID);
        // if (!isContactExist) {
        //     throw new  NotFoundError("Contact Does not Exist");
        // }
        
        let info = this.Contacts[index].getContactInfoByID(contactInfoID)
    //    console.log("11", this.contacts[indexOfUser]);
        return info
    }
    catch(rasikap){
        console.log("Rasika Catch");
        console.log(rasikap.message);
    }

}
}
    
 
let adminObj = User.newAdmin("rasika" ,"female", 23) //creating new admin using User.newAdmin
let user1 = adminObj.newUser("Pratham", "Male", 34)
let user2 = adminObj.newUser("neha", "Female", 40)
let user3 = adminObj.newUser("yash", "Male", 24)
// let user1=adminObj.newUser("neha", "female" , 45)
// let user2 = user1.newUser("sanu","female" , 30) //creating user2 through user1 so it will give error
// let user3 = adminObj.newUser("parth","male" , 18)  //creating user3 through admin(adminObj) so it will give true output
console.log(adminObj.getAllUsers());//for all users
//let user1=adminObj.newUser("neha")
//console.log(user1.getAllUsers());//[] Not Authorized

console.log("Newly created contacts : " ,user1.createContact("Siddh", "IND", "sidd@gmail.com"))
console.log("Newly created contacts : " ,user1.createContact("lina", "USA", "lina@gmail.com"))
console.log("Newly created contacts : " ,user1.createContact("zaid", "AUS", "zaid@gmail.com"))
console.log("Get all  new previously created contacts : " ,user1.getAllContact())
// // Add the contacts to the ContactManager
// User.allUsers.push(user1, user2, user3);
// // Find contacts by ID
// let result = User.findContact(2);
// console.log("find contact by Id : " ,result); 
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