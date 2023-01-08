const express = require("express")
const router = new express.Router()
const controller = require("../Controllers/usersController")
const upload = require("../multerconfig/storageConfig")


router.post("/user/register", upload.single("user_profile"), controller.userPost)
router.get("/user/details", controller.userGet)
router.get("/userprofile/:id", controller.singleUserGet)
router.put("/user/edit/:id", upload.single("user_profile"), controller.userEdit)
router.delete("/user/delete/:id", controller.userDelete)
router.put("/user/status/:id", controller.userStatus)
router.get("/userexport", controller.userExport)


module.exports = router