const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check_auth");
const CommentController = require("../controllers/comments");

router.post("/:postSlug/", checkAuth.IsAuthenticated, CommentController.commentCreate);
router.post("/:postSlug/:parentId/", checkAuth.IsAuthenticated, CommentController.childCommentCreate);
router.patch("/:postSlug/:commentId/", checkAuth.IsAuthenticated, checkAuth.IsCommentOwner, CommentController.commentUpdate);
router.delete("/:postSlug/:commentId/", checkAuth.IsAuthenticated, checkAuth.IsCommentOwner, CommentController.commentDelete);

module.exports = router;
