const express = require("express");
const {getallUsers,userById,getUser,updateUser,deleteUser} = require("../controllers/user");
const {requireSignin} = require("../controllers/auth");
const router = express.Router();

router.get("/users",getallUsers); // get all users
router.get("/user/:userId",requireSignin,getUser); // get  user
router.put("/user/:userId",requireSignin,updateUser); // update  user
router.delete("/user/:userId",requireSignin,deleteUser); // delete  user

router.param('userId', userById)

module.exports = router;
