const express = require("express")

const router = new express.Router()
const controller = require("../Controllers/usersController")

router.post("/user/register", controller.userpost)

router.post("/user/register", (req,res)=>{

})


module.exports = router