const mongoose = require("mongoose"),
    bcrypt = require("bcrypt"),
    jwt = require("jsonwebtoken");

const User = require("../models/user");
const KEYS = require("../keys");
const Email = require("../utils/emails");
const Utils = require("../utils/index");

exports.registration = async (req, res, next) => {
    const { full_name, email, password, confirm_password } = req.body;
    if (password !== confirm_password) {
        return res.status(500).json({ message: "Password doesn't match." });
    }
    let userByEmail = await User.findOne({ email: email });
    if (userByEmail) {
        return res.status(409).json({ "message": "Email exists." });
    }
    let username = Utils.username(full_name);
    let userByUsername = await User.findOne({ username: Utils.username(full_name) });
    if (userByUsername) {
        username += new mongoose.Types.ObjectId();
    }
    bcrypt.hash(password, 10, (error, hash) => {
        if (error) {
            return res.status(500).json({ error: error });
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: email,
                username: username,
                password: hash,
                full_name: full_name,
            });
            user.save().then(result => {
                Email.sendConfirmationEmail(email);
                res.status(201).json({ message: "User created" });
            }).catch(error => {
                console.log(error);
                res.status(500).json({ error: error });
            });
        }
    });

}


exports.login = (req, res, next) => {
    const message = "Provided Cradintial not valid."
    const { user_identity, password } = req.body;
    User.findOne({ email: user_identity }).exec().then(user => {
        bcrypt.compare(password, user.password, (error, result) => {
            if (error) {
                return res.status(401).json({ message: message })
            }
            if (result) {
                const token = jwt.sign(
                    { userId: user._id },
                    process.env.JWT_KEY,
                    { expiresIn: KEYS.LOGIN_EXPIRES_IN }
                )
                return res.status(200).json({
                    access: token,
                    message: "Auth Successful.",
                    username: user.username
                });
            }
            else {
                return res.status(401).json({ message: message });
            }
        });
    }).catch(error => {
        res.status(500).json({ message, error: error });
    });
}


exports.userRetrive = (req, res, next) => {
    const fields = ["_id", "email", "full_name", "profile_image", "created_at",];

    const username = req.params.username;
    User.findOne({username: username}).exec().then(doc => {
        if (doc) {
            res.status(200).json(
                Utils.extract(doc, fields)
            );
        } else {
            res.status(404).json({ message: "post not exists." });
        }
    }).catch(error => {
        res.status(500).json({ error: error });
    });
}
exports.userUpdate = (req, res, next) => {
    const fields = ["email", "full_name", "profile_image", "profession", "description",];
    req.body["profile_image"] = req.file ? req.file.path : "";

    const userId = req.user._id;

    const updateOps = Utils.extract(req.body, fields);
    User.updateOne({ _id: userId }, { $set: updateOps }).exec().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ message: "Server Error", error: error });
    });
}
exports.resetPassword = (req, res, next) => {
    const fields = ["current_password", "new_password", "confirm_password",];
    const { current_password, new_password, confirm_password } = req.body;

    const userId = req.user._id;
    if (new_password !== confirm_password) {
        return res.status(500).json({ message: "Password doesn't match." });
    }

    User.findById(userId).exec().then(user => {
        if (user) {
            bcrypt.compare(current_password, user.password, (error, result) => {
                if (error) {
                    return res.status(401).json({ message: "Error", error })
                }
                if (result) {
                    bcrypt.hash(new_password, 10, (error, hash) => {
                        if (error) {
                            return res.status(500).json({ error: error });
                        } else {
                            User.updateOne({ _id: userId }, { $set: { password: hash } }).exec().then(result => {
                                res.status(200).json(result);
                            }).catch(error => {
                                res.status(500).json({ message: "Server Error", error: error });
                            });
                        }
                    });
                }
                else {
                    return res.status(401).json({ message: "Wrong password." });
                }
            });

        } else {
            res.status(404).json({ message: "User not found." });
        }
    }).catch(error => {
        res.status(500).json({ error: error });
    });
}
exports.sendVerificationMail = (req, res, next) => {
    const userId = req.user._id;
    User.findById(userId).exec().then(user => {
        const token = jwt.sign(
            { email: user.email, userId: user._id },
            process.env.JWT_KEY,
            { expiresIn: Value.EMAIL_VERIFICATION_EXPIRES_IN }
        )
        Email.sendVerificationEmail(user.email, data = { token });
        res.status(200).json({ message: "Email send successfully." });
    }).catch(error => {
        res.status(500).json({ error: error });
    });
}

exports.confirmMail = (req, res, next) => {
    try {
        const token = parseInt(req.query.token) || req.query.token;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const { userId } = decoded;
        User.findById(userId).exec().then(user => {
            if (user) {
                res.status(200).json({ message: "User verify successfully." });
            } else {
                res.status(400).json({ message: "Invalid user." });
            }
        }).catch(error => {
            res.status(500).json({ error: error });
        });
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}