const POST = require('../models/post')
const formidable = require('formidable');
const fs = require('fs');

exports.getPosts = (req, res) => {
    POST.find()
    .populate("postedBy", "_id name")
    .select('_id title body')
   .then((result)=>{
       res.status(200).json({
           allpost :result 
       })
   })
   .catch(err => console.log(err))
   

};

exports.createPost = (req, res) => {
    const post = new POST(req.body)
    post.postedBy=res.profile
    console.log('creating post:', post)
    post.save()
    .then((result)=>{
        res.status(200).json({
            post: result
        })
    })

};