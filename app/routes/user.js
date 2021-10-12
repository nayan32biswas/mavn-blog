const express = require("express");
const router = express.Router();
const multer = require("multer");

const ImageUtils = require("../utils/image");
const checkAuth = require("../middleware/check_auth");
const UserController = require("../controllers/users");

// Upload file
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, callback) { callback(null, "./media/user/"); },
        filename: function (req, file, callback) { callback(null, ImageUtils.getImageName(file)); }
    }),
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: ImageUtils.fileFilter
});

router.post("/registration/", UserController.registration);
router.post("/login/", UserController.login);
router.get("/profile/:username/", UserController.userRetrive);
router.get("/send_verification/", checkAuth.IsAuthenticated, UserController.sendVerificationMail);
router.get("/confirm_mail/", UserController.confirmMail);
router.patch("/reset_password/", checkAuth.IsAuthenticated, UserController.resetPassword);
router.patch("/profile/", checkAuth.IsAuthenticated, upload.single("profile_image"), UserController.userUpdate);

module.exports = router;