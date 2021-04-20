const mongoose = require('mongoose')
const  uuidv1 = require('uuidv1');
const  crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name:{
          type:String,
          required:true 
    },
    email:{
        type:String,
        required:true
    },
    hashed_password:{
        type:String,
        required:true
    },
    salt:String,
    created:{
        type:Date,
        default: Date.now
    },
    updated:Date
})

// virtual field 
userSchema.virtual('password')
.set(function(password){
    // create temp varible
    this._password = password
    // create timestamp
    this.salt=uuidv1()
    // encript pass 
    this.hashed_password= this.encriptPassword(password)

})
.get(function(){
    return this._password
})

// method
userSchema.methods={
    authenticate:function(plaintext){
         return this.encriptPassword(plaintext)===this.hashed_password
    },
    encriptPassword:function(password){
        if(!password) return " "
        try{
            return crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
        }
        catch(err){
           return " "
        }
    }
}


module.exports= mongoose.model('User',userSchema)