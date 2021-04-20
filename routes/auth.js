const express = require("express");
const {signup,signin,signout} = require("../controllers/auth");
const {userSignUpValidator} = require('../validator/index')
const router = express.Router();

router.post("/signup",userSignUpValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);


module.exports = router;
