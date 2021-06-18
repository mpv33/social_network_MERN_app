const express = require("express");
const {createPost,getPosts,getPostbyUser,deletePostbyId,isPostor,postById,updatePost,getPost} = require("../controllers/post");
const {userById} = require("../controllers/user");
const {createPostValidator} = require('../validator/index')
const {requireSignin} = require("../controllers/auth");
const router = express.Router();

router.get("/", getPosts);  // get all posts
router.post("/post/create/:userId",requireSignin, createPost,createPostValidator); // create  new post
router.get("/postbyuser/:userId",requireSignin, getPostbyUser); // all post by user 
router.get("/post/:postId",requireSignin, getPost); //  post by id 
router.put("/post/:postId",requireSignin,isPostor, updatePost); //  update post  by id
router.delete("/post/:postId",requireSignin,isPostor, deletePostbyId); //  delete post  by id

router.param('userId', userById)
router.param('postId', postById)

module.exports = router;
