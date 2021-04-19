exports.createPostValidator= (req,res,next)=>{
// title 
req.check('title','title is missing').notEmpty()
req.check('title','title len can not less than 5 char').isLength({
    min:5,
    max:150
})

// body 
req.check('body','body is missing').notEmpty()
req.check('body','body len can not less than 5 char').isLength({
    min:5,
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