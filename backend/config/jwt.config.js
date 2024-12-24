module.exports = {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    accessTokenExpiresIn: '15m',
    refreshTokenExpiresIn: '7d',
    accessCookieMaxAge: 60 * 60 * 1000,
    refreshCookieMaxAge: 7 * 24 * 60 * 60 * 1000,
}