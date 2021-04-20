const User = require('../models/user')
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const expressJwt = require('express-jwt');
dotenv.config();

exports.signup = async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email })
    if (userExists) {
        return res.status(403).json({
            err: 'This email already exist ',
            email: req.body.email
        })
    }
    const user = await new User(req.body)
    await user.save();
    res.status(200).json({
        msg: 'signup succesfull plz login !',
       // newUser: user
    })


};
exports.signin = (req,res) => {
    // find user 
    const {email,password} = req.body
    User.findOne({email}, (err,user)=>{
        if(err || !user){
            return res.status(401).json({
                error: 'this email not exist plz signup !'
            })
        }
    // authenicate pass 
      if(!user.authenticate(password)){
        return res.status(401).json({
            error: 'this email and password does not matched ... plz signin again !' 
        })
      }
      // generate token based on user id and secret key
   const token =    jwt.sign({_id:user._id}, process.env.JWT_SECRET)
   res.cookie('t',token,{expire:new Date() + 9999})
   const {_id,email,name}=user
   return res.json({
       token,
       user: {_id,email,name}
   })
 
    })
}

exports.signout = (req,res)=>{
    res.clearCookie('t')
    return res.json({
        msg: 'user succesfully logout thank you !'
    })
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
  });