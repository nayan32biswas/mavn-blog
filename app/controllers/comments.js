const mongoose = require("mongoose");

const Post = require("../models/post");
const Utils = require("../utils/index");

exports.commentCreate = (req, res, next) => {
    const fields = ["text",];
    const userId = req.user._id, postSlug = req.params.postSlug;
    Post.findOne({ slug: postSlug }).exec().then(post => {
        if (post) {
            const comment = {
                _id: new mongoose.Types.ObjectId(),
                user: userId,
                ...Utils.extract(req.body, fields),
            }
            Post.updateOne({ slug: postSlug }, { $push: { comments: comment } }).exec().then(result => {
                res.status(200).json(result);
            }).catch(error => {
                res.status(500).json({ message: "Server Error", error });
            });
        }
        else {
            res.status(404).json({ message: "Post Not Found." });
        }
    }).catch(error => {
        res.status(500).json({ error: error });
    });
}

exports.childCommentCreate = (req, res, next) => {
    const fields = ["text",];
    const userId = req.user._id, postSlug = req.params.postSlug;
    const parentCommentId = mongoose.Types.ObjectId(req.params.parentId);
    Post.findOne({ slug: postSlug }).exec().then(post => {
        if (post) {
            const parentComment = post.comments.find((element) => element._id.equals(parentCommentId));
            if (parentComment.parent) {
                return res.status(405).json({ message: "Invalid try. Server doesn't support multilevel comment." })
            }
            const childComment = {
                _id: new mongoose.Types.ObjectId(),
                user: userId,
                parent: parentCommentId,
                ...Utils.extract(req.body, fields),
            }
            Post.updateOne({ slug: postSlug }, { $push: { comments: childComment } }).exec().then(result => {
                res.status(200).json(result);
            }).catch(error => {
                res.status(500).json({ message: "Server Error", error });
            });
        }
        else {
            res.status(404).json({ message: "Not Found." });
        }
    }).catch(error => {
        res.status(500).json({ error: error });
    });
}

exports.commentDelete = async (req, res, next) => {
    try {
        const postSlug = mongoose.Types.ObjectId(req.params.postSlug);
        const commentId = mongoose.Types.ObjectId(req.params.commentId);
        const result = await Post.updateOne({ slug: postSlug }, { $pull: { comments: { _id: commentId } } });
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Not Found.", error: error });
    }
}
exports.commentUpdate = async (req, res, next) => {
    try {
        const postSlug = mongoose.Types.ObjectId(req.params.postSlug);
        const commentId = mongoose.Types.ObjectId(req.params.commentId);
        const text = req.body.text;
        const result = await Post.updateOne(
            { slug: postSlug, "comments._id": commentId },
            { $set: { "comments.$.text": text } }
        );
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Not Found.", error: error });
    }
}