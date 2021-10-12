const mongoose = require("mongoose");

const Post = require("../models/post");
const User = require("../models/user");
const KEYS = require("../keys");
const Pagination = require("../utils/pagination");
const Utils = require("../utils/index");

exports.postList = (req, res, next) => {
    const fields = ["user", "title", "slug", "content", "created_at", "post_image", "comments"];

    const PAGE_SIZE = KEYS.PAGE_SIZE, page = parseInt(req.query.page) || 0;
    // Select fields from fields
    Post.find({ published: true }).select(fields.join(' ')).limit(PAGE_SIZE).skip(PAGE_SIZE * page)
        .populate({ path: "user", select: "username full_name" }).exec().then(docs => {
            const pagination = Pagination.pagination(page, PAGE_SIZE, docs.length, `${process.env.HOST}/api/posts/`);
            const response = {
                ...pagination,
                results: docs.map(doc => {
                    // Extract data by key following by fields.
                    const data = Utils.extract(doc, fields);
                    data["content"] = data["content"].substring(0, 256);
                    data["comments"] = doc.comments.length
                    return {
                        ...data,
                    }
                })
            };
            res.status(200).json(response);
        }).catch(error => {
            console.log(error);
            res.status(500).json({ error: error });
        });
}

exports.userPostList = async (req, res, next) => {
    const fields = ["user", "published", "title", "slug", "content", "created_at", "post_image"];
    let query = {};
    const username = req.params.username;
    if (req.user.username == username) {
        query = { user: req.user._id };
    } else {
        const user = await User.findOne({ username: username });
        query = { user: user._id, published: true };
    }
    const PAGE_SIZE = KEYS.PAGE_SIZE, page = parseInt(req.query.page) || 0;
    // Select fields from fields
    Post.find(query).select(fields.join(' '))
        .limit(PAGE_SIZE).skip(PAGE_SIZE * page)
        .populate("user", "username").exec().then(docs => {
            const pagination = Pagination.pagination(page, PAGE_SIZE, docs.length, `${process.env.HOST}/api/posts/user/${username}/`);
            const response = {
                ...pagination,
                results: docs.map(doc => {
                    // Extract data by key following by fields.
                    const data = Utils.extract(doc, fields);
                    data["content"] = data["content"].substring(0, 256);
                    return {
                        ...data,
                        data: "data"
                    }
                })
            };
            res.status(200).json(response);
        }).catch(error => {
            res.status(500).json({ error: error });
        });
}

exports.postCreate = async (req, res, next) => {
    const fields = ["title", "content", "post_image"];
    req.body["post_image"] = req.file ? req.file.path : "";

    const userId = req.user._id;
    const published = req.body.published || false;
    let slug = Utils.slugify(req.body.title);

    const doc = await Post.findOne({ slug: slug });
    if (doc) slug = `${slug}-${new mongoose.Types.ObjectId()}`
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        user: userId,
        published,
        slug,
        // Extract data by key following by fields.
        ...Utils.extract(req.body, fields),
    });
    post.save().then(result => {
        res.status(201).json(result);
    }).catch(error => {
        res.status(500).json({ error: error });
    });
}
exports.postRetrive = (req, res, next) => {
    const fields = ["user", "title", "slug", "post_image", "content", "published", "created_at", "updated", "comments",];

    const postSlug = req.params.postSlug;
    Post.findOne({ slug: postSlug }).populate("user", "username").exec().then(doc => {
        if (doc) {
            res.status(200).json(
                // Extract data by key following by fields.
                Utils.extract(doc, fields),
            );
        } else {
            res.status(404).json({ message: "post not exists." });
        }
    }).catch(error => {
        res.status(500).json({ error: error });
    });
}
exports.postUpdate = (req, res, next) => {
    const fields = ["title", "content", "post_image", "published"];
    req.body["post_image"] = req.file ? req.file.path : "";
    var postSlug = req.params.postSlug;
    const updateOps = Utils.extract(req.body, fields);
    Post.updateOne({ slug: postSlug }, { $set: updateOps }).exec().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error });
    });
}

// Unused
exports.postDelete = (req, res, next) => {
    var postSlug = req.params.postSlug;
    Post.remove({ slug: postSlug }).exec().then(result => {
        res.status(200).json(result)
    }).catch(error => {
        res.status(500).json({ error: error });
    });
}