const jwt = require("jsonwebtoken");
const config = require("../config/jwt.config");

exports.generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, config.accessTokenSecret, {
        expiresIn: config.accessTokenExpiresIn
    })
}
exports.generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, config.refreshTokenSecret, {
        expiresIn: config.refreshTokenExpiresIn
    })
}
exports.generateAdminAccessToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, config.adminAccessTokenSecret, {
        expiresIn: config.accessTokenExpiresIn
    })
}
exports.generateAdminRefreshToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, config.adminRefreshTokenSecret, {
        expiresIn: config.refreshTokenExpiresIn
    })
}