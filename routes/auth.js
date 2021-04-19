const express = require("express");
const {signup} = require("../controllers/auth");
const {getUsers} = require("../controllers/user");
const {userSignUpValidator} = require('../validator/index')
const router = express.Router();

router.post("/signup",userSignUpValidator, signup);
router.get("/users", getUsers);
module.exports = router;
