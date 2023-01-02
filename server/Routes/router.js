const express = require("express")
const router = new express.Router()
const controller = require("../Controllers/usersController")
const upload = require("../multerconfig/storageConfig")

router.post("/user/register", upload.single("user_profile"), controller.userpost)


module.exports = router