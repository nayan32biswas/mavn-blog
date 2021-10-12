const express = require("express");
const router = express.Router();
const multer = require("multer");

const ImageUtils = require("../utils/image");
const checkAuth = require("../middleware/check_auth");
const PostController = require("../controllers/posts");

// Upload file
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, callback) { callback(null, "./media/post/"); },
        filename: function (req, file, callback) { callback(null, ImageUtils.getImageName(file)); }
    }),
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: ImageUtils.fileFilter
});

router.get("/", PostController.postList);
router.get("/:postSlug/", PostController.postRetrive);
router.post("/", checkAuth.IsAuthenticated, upload.single("post_image"), PostController.postCreate);
router.patch("/:postSlug/", checkAuth.IsAuthenticated, checkAuth.IsPostOwner, upload.single("post_image"), PostController.postUpdate);
router.delete("/:postSlug/", checkAuth.IsAuthenticated, checkAuth.IsPostOwner, PostController.postDelete);
router.get("/user/:username/", checkAuth.AllowAny, PostController.userPostList);

module.exports = router;
