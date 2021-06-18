const POST = require('../models/post')
const formidable = require('formidable');
const fs = require('fs');

const _ = require("lodash");

exports.getPosts = (req, res) => {
    POST.find()
        .populate("postedBy", "_id name")
        .select('_id title body')
        .then((result) => {
            res.status(200).json({
                allpost: result
            })
        })
        .catch(err => console.log(err))
};


exports.postById = (req, res, next, id) => {
    POST.findById(id).exec((err, post) => {
        if (err || !post) {
            return res.status(400).json({
                error: 'post not found'
            })
        }
        req.post = post
      // console.log(post)
        // res.json({
        //     post : req.post
        // })
        next()
    })
    
}
exports.getPost = (req, res) => {
    POST.findById(req.post._id).exec((err, post) => {
        if (err || !post) {
            return res.status(400).json({
                error: 'post not found'
            })
        }
        res.json({
            post : req.post
        })

    })
    
}

exports.createPost = (req, res) => {
    let form = new formidable.IncomingForm()
    form.KeepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'image could not uploaded'
            })
        }
        const post = new POST(fields)
        post.postedBy = req.profile
        console.log('creating post:', post)
        if (files.photo) {
            files.photo.data = fs.readFileSync(files.photo.path);
            files.photo.contentType = files.photo.type;
        }
        post.save((err, post) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json({
                result: post
            })
        })

    })

};

exports.getPostbyUser = (req, res) => {
 console.log('user id : ',req.profile._id)
    POST.find({ postedBy: req.profile._id })
        .populate("postedBy", "_id name")
        .sort('_created')
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json({
                result: result
            })
        })

};

exports.isPostor = (req,res,next) =>{
     
    let isPost = req.post && req.auth && req.post.postedBy._id==req.auth._id
    console.log( 'post:', req.post)
    console.log( 'auth:', req.auth._id)
   
    if(!isPost){
        return res.status(403).json({
            message: 'user not authorized'
        })
    }
    next()

}

exports.updatePost = (req, res) => {
    let post = req.post
    post = _.extend(post, req.body)
    post.updated = Date.now()
    post.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
    
        res.json({post})

    })
   
}
exports.deletePostbyId = (req,res) =>{

  let post = req.post
  post.remove((err,result)=>{
      if(err){
          return res.status(400).json({
              error: err
          })
      }
      res.json({
          message: 'post deleted succesfully' ,result
      })
  })

}
