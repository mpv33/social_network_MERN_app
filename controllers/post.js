const POST = require('../models/post')

exports.getPosts = (req, res) => {
   const allpost = POST.find().select('_id title body')
   .then((result)=>{
       res.status(200).json({
           allpost :result 
       })
   })
   .catch(err => console.log(err))
   

};

exports.createPost = (req, res) => {
    const post = new POST(req.body)
    console.log('creating post:', req.body)
    post.save()
    .then((result)=>{
        res.status(200).json({
            post: result
        })
    })
   

};