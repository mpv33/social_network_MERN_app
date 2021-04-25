const express = require("express");
const {createPost,getPosts} = require("../controllers/post");
const {getallUsers,userById,getUser,updateUser,deleteUser} = require("../controllers/user");
const {createPostValidator} = require('../validator/index')
const {requireSignin} = require("../controllers/auth");
const router = express.Router();

router.get("/", getPosts);  // get all posts
router.post("/post/new/:userId",requireSignin, createPost,createPostValidator); // create  new post
router.param('userId', userById)

module.exports = router;
