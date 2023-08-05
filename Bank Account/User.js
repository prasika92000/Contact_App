const Account = require("./Account")
const Bank = require("./Bank")
const ValidationError = require("./error/ValidationError")
const UnauthorizedError = require("./error/UnAuthorizedError")
const NotFoundError= require("./error/NotFoundError")
class User{
    static allUsers = []
    static allBanks = []
    static userID = 0
    constructor(fullname, isAdmin, gender, age){
        this.ID =  User.userID++
        this.fullname = fullname
        this.isAdmin = isAdmin
        this.gender = gender
        this.age = age
        this.contacts = []
       
    }
    updateFullName(newValue){
        return this.fullName = newValue
    }

    updateAge(newValue){
        return this.age =newValue
    }

    updateGender(newValue){
        return this.gender = newValue
    }
    getId(){
        return this.Id
    }

    getAccount(){
        return this.accounts
    }
    newUser(fullName, age, gender){
        try {
            if(!this.isAdmin){
                throw new UnauthorizedError("You are not an Authorized Admin")
            }
            if(typeof fullName != "string"){
                throw new ValidationError("Full Name not valid")
            }
            if(typeof age != "number"){
                throw new ValidationError("Age not valid")
            }
            if(typeof gender != "string"){
                throw new ValidationError("Gender not valid")
            }
            let userObj = new User(fullName, age, gender, false)
            User.allUsers.push(userObj)
            return userObj
        } 
        catch (error) {
             return error
            //console.log(error.specificMessage);
        }
    }
    static newAdmin(fullName, age, gender){
        try {
            if(typeof fullName != "string"){
                throw new ValidationError("Full Name not valid")
            }
            if(typeof age != "number"){
                throw new ValidationError("Age not valid")
            }
            if(typeof gender != "string"){
                throw new ValidationError("Gender not valid")
            }
            return new User(fullName, age, gender, true)
            } 
        catch (error) {
               return error
             //console.log(error.specificMessage);
            }
      }
    newBank(bankName){
        try {   
            if(!this.isAdmin){
                throw new UnauthorizedError("You are not an Authorized Admin")
            }
            if(typeof bankName != "string"){
                throw new ValidationError("Bank name not valid")
             }
            let bankObj = new Bank(bankName)
            User.allBanks.push(bankObj)
        }
        catch (error) {
             return error
         }
    }
    findBank(bankId){
        try {
            if(typeof bankId != "number"){
                throw new ValidationError("BankID not valid")
            }
            for (let index = 0; index < User.allBanks.length; index++) {
                if(bankId == User.allBanks[index].getBankId()){
                    return index
                }
            }
            throw new NotFoundError("BankID not found")
        } 
        catch (error) {
            throw error  
        }
    }

    updateBank(bankId, newValue){
        try {
            if(!this.isAdmin){
                throw new UnauthorizedError("You are not Authorized Admin")
            }
            if(typeof bankId != "number"){
                throw new ValidationError("UserID not valid")
            }
            if(typeof newValue != "string"){
                throw new ValidationError("BankName not valid")
            }
            let indexOfBank = this.findBank(bankId)
            User.allBanks[indexOfBank].updateBankName(newValue)
            return User.allBanks
        } catch (error) {
            return error
        }
    }

    deleteBank(bankId){
        try {
            if(!this.isAdmin){
                throw new UnauthorizedError("You are not Authorized Admin")
            }
            if(typeof bankId != "number"){
                throw new ValidationError("user ID not valid")
            }
            let indexOfBank = this.findBank(bankId)
            User.allBanks.splice(indexOfBank, 1)
            return User.allBanks
        } catch (error) {
            return error
        }
    }
    findUser(userId){
        try {
            if(typeof userId != "number"){
                throw new ValidationError("UserID not valid")
            }
            for (let index = 0; index < User.allUsers.length; index++) {
                if(userId == User.allUsers[index].getId()){
                    return index
                }
            }
            throw new NotFoundError("UserID not found")
        } 
        catch (error) {
            throw error  
        }
    }
    
    getAllUser(){
        try {
            if(!this.isAdmin){
                throw new UnauthorizedError("You are not Authorized Admin")
            }
            return User.allUsers
        } catch (error) {
            return error
        }
    }

    updateUser(userId, parameter, newValue){
        try {
            if(!this.isAdmin){
                throw new UnauthorizedError("You are not Authorized Admin")
            }
            if(typeof userId != "number"){
                throw new ValidationError("UserID not valid")
            }
            let indexOfUser = this.findUser(userId)
            switch (parameter) {
                case "fullName": if (typeof newValue != "string") 
                { throw new ValidationError("full name not valid") }
                    User.allUsers[indexOfUser].updateFullName(newValue)
                    return User.allUsers[indexOfUser]
               
                case "age": if (typeof newValue != "number") 
                { throw new ValidationError("age not valid") }
                    User.allUsers[indexOfUser].updateAge(newValue)
                    return User.allUsers[indexOfUser]
                
                case "gender": if (typeof newValue != "string") 
                { throw new ValidationError("gender not valid") }
                    User.allUsers[indexOfUser].updateGender(newValue)
                    return User.allUsers[indexOfUser]
                
                default: throw new NotFoundError("parameter not found")
            }
        } catch (error) {
            return error   
        }
    }

    deleteUser(userId){
        try {
            if(!this.isAdmin){
                throw new UnauthorizedError("You are not Authorized Admin")
            }
            if(typeof userId != "number"){
                throw new ValidationError("user ID not valid")
            }
            let indexOfUser = this.findUser(userId)
            User.allUsers.splice(indexOfUser, 1)
            return User.allUsers
        } catch (error) {
            return error
        }
    }

    createAccount(bankId, balance){
        try {
            if(this.isAdmin){
                throw new UnauthorizedError("You are not Authorized Admin")
            }
            if(typeof balance != "number"){
                throw new ValidationError("Balance not valid")
            }
            if(typeof bankId != "number"){
                throw new ValidationError("BankID not valid")
            }
            let createdAccount = new Account(balance)
            let indexOfBank = this.findBank(bankId)
            User.allBanks[indexOfBank].accountsInBank.push(createdAccount)
            this.accounts.push(createdAccount)
            return this.accounts
        } catch (error) {
            return error
        }
    }

    findAccount(accountId){
        try {
            if(this.isAdmin){
                throw new UnauthorizedError("You are not Authorized Admin")
            }
            if(typeof accountId != "number"){
                throw new ValidationError("AccountID not valid")
            }
            for (let index = 0; index < this.accounts.length; index++) {
                if(accountId == this.accounts[index].getAccountId()){
                    return index
                }
            }
            throw new NotFoundError("AccountID not Found")
        } catch (error) {
            throw error   
        }
    }

    getAllAccount(){
        try {
            if(this.isAdmin){
                throw new UnauthorizedError("You are not Authorized Admin")
            }
            return this.accounts
        } catch (error) {
            return error
        }
    }

    deleteAccount(accountId){
        try {
            if(this.isAdmin){
                throw new UnauthorizedError("You are not Authorized Admin")
            }
            if(typeof accountId != "number"){
                throw new ValidationError("AccountID not valid")
            }
            let indexOfAccount = this.findAccount(accountId)
            this.accounts.splice(indexOfAccount, 1)
            return this.accounts
        } catch (error) {
            return error
        }
    }

    deposit(accountId, amount){
        try {
            if(this.isAdmin){
                throw new UnauthorizedError("You are not Authorized Admin")
            }
            if(typeof accountId != "number"){
                throw new ValidationError("AccountID not valid")
            }
            let indexOfAccount = this.findAccount(accountId)
            this.accounts[indexOfAccount].deposit(amount)
            return this.accounts
        } 
        catch (error) {
            return error
        }
    }

    withdraw(accountId, amount){
        try {
            if(this.isAdmin){
                throw new UnauthorizedError("You are not Authorized Admin")
            }
            if(typeof accountId != "number"){
                throw new ValidationError("AccountID not valid")
            }
            let indexOfAccount = this.findAccount(accountId)
            this.accounts[indexOfAccount].withdraw(amount)
            return this.accounts
        } 
        catch (error) {
            return error
        }
    }

    findReceiverAccount(obj, accountId){
        try {
            if(obj.isAdmin){
                throw new UnauthorizedError("You are not Authorized Admin")
            }
            if(typeof accountId != "number"){
                throw new ValidationError("Receiver Account ID not valid")
            }
            for (let index = 0; index < obj.accounts.length; index++) {
                if(accountId == obj.accounts[index].id){
                    return index
                }
            }
            throw new NotFoundError("Receiver Account not found")
        } catch (error) {
            throw error.specificMessage
        }
    }

    transfer(amount, fromAccoutId, receiverUserId, receiverAccountId){
        try {
            if(this.isAdmin){
                throw new UnauthorizedError("You are not Authorized Admin")
            }
            let indexOfReceiver = this.findUser(receiverUserId) 
            let reciever = User.allUsers[indexOfReceiver]
            let indexOfReceiverAccount = this.findReceiverAccount(reciever, receiverAccountId)
            let indexOfSenderAccount = this.findAccount(fromAccoutId)
           
            this.accounts[indexOfSenderAccount].withdraw(amount)
            reciever.accounts[indexOfReceiverAccount].deposit(amount)
            return this.accounts
        } 
        catch (error) {
            return error
        }
    }

    getPassBook(accountId){
        try {
            if(this.isAdmin){
                throw new UnauthorizedError("You are not Authorized Admin")
            }
            if(typeof accountId != "number"){
                throw new ValidationError("Account ID not valid")
            }
            let indexOfPassBook = this.findAccount(accountId)
            return this.accounts[indexOfPassBook].getPassBook()
        } 
        catch (error) {
            return error
        }
    }

    getNetworth(userId){
        try {
            if(typeof userId != "number"){
                throw new ValidationError("UserID not valid")
            }
            let indexOfUser = this.findUser(userId)
            let userAccounts = User.allUsers[indexOfUser].getAllAccount()
            let netWorth = 0
            for (let index = 0; index < userAccounts.length; index++) {
                netWorth = netWorth + userAccounts[index].getBalance()      
            }
            return netWorth
        } 
        catch (error) {
            return error
        }
    }

    getAccountsInBank(bankId){
        try {
            if(!this.isAdmin){
                throw new UnauthorizedError("You are not Authorized Admin")
            }
            if(typeof bankId != "number"){
                throw new ValidationError("UserID not valid")
            }
            let indexOfBank = this.findBank(bankId)
            return User.allBanks[indexOfBank]
        } catch (error) {
            return error
        }
    }

}
let a = User.newAdmin("Rasika", 23,"Female")
let user1 = a.newUser("Bhumika",18,"Female")
let user2 = a.newUser("Nishant", 20,"Male")
let bank1 = a.newBank("SBI BANK")
let bank2 = a.newBank("HDFC BANK")
let bank3 = a.newBank("UNION BANK")

user1.createAccount(0, 15000)
user1.createAccount(1, 40000)
user1.createAccount(2,56000)
console.log(" After creating User1 account ");
console.log(user1.getAllAccount());
console.log("***********************************************************");

user1.deposit(0, 5000)
console.log("User1 account after depositing money in account");
console.log(user1.getAllAccount());
console.log("***********************************************************");

user2.createAccount(0, 20000)
user2.createAccount(1,30000)
user2.createAccount(2,200000)
console.log("User2 account after creating account");
console.log(user2.getAllAccount());
console.log("***********************************************************");

console.log(user2.transfer(90000, 2, 1, 0))
console.log("total bank acccounts in bank 1");
console.log(a.getAccountsInBank(0));
console.log("***********************************************************");

console.log("User1 Account 1 passbook");
console.log(user1.getPassBook(0));
console.log("***********************************************************");

console.log("User2 Account 1 passbook");
console.log(user2.getPassBook(2));
console.log("***********************************************************");

console.log("networth of User1 : ", user1.getNetworth(1))
console.log("networth of User2 : ", user2.getNetworth(2));
console.log("***********************************************************");
