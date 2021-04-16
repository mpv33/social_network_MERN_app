const POST = require('../models/post')

exports.getPosts = (req, res) => {
    res.json({
        posts: [{ title: "First post" }, { title: "Second post" }]
    });
};

exports.createPost = (req, res) => {
   const post = new POST(req.body)
   console.log('creating post:',req.body)
   res.json(req.body)
};