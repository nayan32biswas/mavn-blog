const mongoose = require("mongoose");

const match = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    password: { type: String, requred: true },
    email: { type: String, requred: true, unique: true, match: match, index: true },
    username: { type: String, requred: true, unique: true, index: true },
    full_name: { type: String, requred: true },
    profile_image: { type: String, requred: true },
    profession: { type: String, },
    description: { type: String, },
    admin: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
});
// userSchema.pre('save', function (next) {
//     var self = this;
//     userSchema.findOne({ email: self.email }, function (err, doc) {
//         if (docs) {
//             next(new Error("User exists!"));
//         } else {
//             next();
//         }
//     });
// });
module.exports = mongoose.model("User", userSchema);