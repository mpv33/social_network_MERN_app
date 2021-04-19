const User = require('../models/user')

exports.getUsers = (req, res) => {
    const allUsers = User.find().select('_id name email')
    .then((result)=>{
        res.status(200).json({
            allUsers :result 
        })
    })
    .catch(err => console.log(err))
    
 
 };