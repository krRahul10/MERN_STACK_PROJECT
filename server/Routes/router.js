const express = require("express")
const router = new express.Router()
const controller = require("../Controllers/usersController")
const upload = require("../multerconfig/storageConfig")


router.post("/user/register", upload.single("user_profile"), controller.userpost)
router.get("/user/details", controller.userGet)
router.get("/userprofile/:id", controller.singleUserGet)

module.exports = router