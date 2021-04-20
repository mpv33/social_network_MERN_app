const User = require('../models/user')
const _ =require("lodash");
const { now } = require('lodash');
exports.getallUsers = (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            users
        })
    }).select('_id name email')


};

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'user not found'
            })
        }
       res.profile = user
     //  console.log(res.profile)
        next()
    })
}
exports.hashAuthorization = (req, res, next) => {
    const authorized = req.auth && req.profile && req.auth._id === req.profile._id
    if (!authorized) {
        return res.status(403).json({
            error: 'user not authorized to perform this operation'
        })
    }

}
exports.getUser = (req, res) => {
    res.profile.hashed_password=undefined
    res.profile.salt=undefined
    res.json(res.profile)
}

exports.updateUser = (req,res)=>{
 let user = res.profile
 user = _.extend(user,req.body)
 user.updated= Date.now()
 user.save((err)=>{
     if(err){
         return res.status(400).json({
             error : err
         })
     }
     user.hashed_password=undefined
     user.salt=undefined
     res.json({user})
    
 })




}