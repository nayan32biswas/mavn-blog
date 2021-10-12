const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", requred: true, index: true },
    title: { type: String, requred: true },
    slug: { type: String, requred: true, unique: true, index: true },
    post_image: { type: String, requred: true },
    content: { type: String, requred: true },
    published: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    comments: [{
        _id: mongoose.Schema.Types.ObjectId,
        parent: { type: mongoose.Schema.Types.ObjectId, default: null },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", requred: true },
        text: { type: String, requred: true },
        created_at: { type: Date, default: Date.now },
    }],
});

module.exports = mongoose.model("Post", postSchema);