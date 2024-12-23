const jwt = require("jsonwebtoken");
const config = require("../config/jwt.config");

exports.generateAccessToken = (user) => {
    return jwt.sign({ id: user._id }, config.accessTokenSecret, {
        expiresIn: config.accessTokenExpiresIn
    })
}
exports.generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, config.refreshTokenSecret, {
        expiresIn: config.refreshTokenExpiresIn
    })
}