const express = require("express");
const {createPost,getPosts} = require("../controllers/post");
const {createPostValidator} = require('../validator/index')
const {requireSignin} = require("../controllers/auth");
const router = express.Router();

router.get("/", getPosts);  // get all posts
router.post("/post",requireSignin,createPostValidator, createPost); // create  new post

module.exports = router;
