const User = require('../models/user')

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