const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Post = require("../models/post");
const User = require("../models/user");

const extractToken = async (req) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = await User.findById(decoded.userId);
}

exports.IsAuthenticated = async (req, res, next) => {
    try {
        await extractToken(req);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorize user." });
    }
}
exports.AllowAny = async (req, res, next) => {
    try {
        await extractToken(req);
    } catch (error) {
        req.user = {};
    }
    next();
}

exports.IsOwner = (req, res, next) => {
    const userId = req.params.userId;
    const authUserId = req.user._id;
    User.findById(userId).exec().then(doc => {
        if (post) {
            if (post.user !== authUserId) {
                return res.status(403).json({ message: "Forbidden." });
            }
            next();
        } else {
            res.status(404).json({ message: "post not exists." });
        }
    }).catch(error => {
        return res.status(500).json({ message: "Server Error.", error: error });
    });
}

exports.IsPostOwner = (req, res, next) => {
    var postSlug = req.params.postSlug;
    const userId = req.user._id;
    Post.findOne({ slug: postSlug }).exec().then(post => {
        if (post) {
            if (!post.user.equals(userId)) {
                return res.status(403).json({ message: "Forbidden." });
            }
            next();
        } else {
            res.status(404).json({ message: "post not exists." });
        }
    }).catch(error => {
        return res.status(500).json({ message: "Server Error.", error: error });
    });
}

exports.IsCommentOwner = (req, res, next) => {
    const postSlug = mongoose.Types.ObjectId(req.params.postSlug);
    const commentId = mongoose.Types.ObjectId(req.params.commentId);
    const userId = req.user._id;
    Post.findOne({ slug: postSlug }).exec().then(post => {
        if (post) {
            const comment = post.comments.find((element) => element._id.equals(commentId));
            if (comment) {
                if (!comment.user.equals(userId)) {
                    return res.status(403).json({ message: "Forbidden." });
                }
                next();
            } else {
                return res.status(404).json({ message: "Comment not exist." });
            }
        } else {
            res.status(404).json({ message: "post not exists." });
        }
    }).catch(error => {
        return res.status(500).json({ message: "Server Error.", error: error });
    });
}