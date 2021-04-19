exports.createPostValidator = (req, res, next) => {
    // title 
    req.check('title', 'title is missing').notEmpty()
    req.check('title', 'title len can not less than 5 char').isLength({
        min: 5,
        max: 150
    })

    // body 
    req.check('body', 'body is missing').notEmpty()
    req.check('body', 'body len can not less than 5 char').isLength({
        min: 5,
        max: 150
    })

    // check error 
    const errors = req.validationErrors()
    if (errors) {
        const first = errors.map(error => error.msg)[0]
        return res.status(400).json({
            errors: first
        })
    }
    next()
}

exports.userSignUpValidator= (req,res,next)=>{
    // name
    req.check('name','name is missing').notEmpty()
    req.check('name','name len can not less than 5 char').isLength({
        min:5,
        max:150
    })
    
    // email
    req.check('email','email is missing').notEmpty()
    req.check('email','email len can not less than 5 char')
    .matches(/.+\@.+\..+/)
    .withMessage('email must be @ contain then . ')
    .isLength({
        min:5,
        max:150
    })
    // password
    req.check('password','password is missing').notEmpty()
    req.check('password','password len can not less than 6 char')
    .matches(/\d/)
    .withMessage('password must be number contain')
    .isLength({
        min:6,
        max:150
    })
    
    // check error 
    const errors= req.validationErrors()
    if(errors){
        const first = errors.map(error=> error.msg)[0]
        return res.status(400).json({
            errors: first
        })
    }
    next()
    }