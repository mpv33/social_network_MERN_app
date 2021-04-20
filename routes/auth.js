const express = require("express");
const {signup,signin} = require("../controllers/auth");
const {getUsers} = require("../controllers/user");
const {userSignUpValidator} = require('../validator/index')
const router = express.Router();

router.post("/signup",userSignUpValidator, signup);
router.post("/signin", signin);
router.get("/users", getUsers);
module.exports = router;
