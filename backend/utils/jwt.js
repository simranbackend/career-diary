const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
    const payload = {
        id: user._id,
        mobile: user.mobile
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
};
