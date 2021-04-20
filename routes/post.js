const express = require("express");
const {createPost,getPosts} = require("../controllers/post");
const {createPostValidator} = require('../validator/index')
const {requireSignin} = require("../controllers/auth");

const router = express.Router();

router.get("/", getPosts);
router.post("/post",requireSignin,createPostValidator, createPost);

module.exports = router;
