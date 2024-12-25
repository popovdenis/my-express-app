module.exports = {
    accessTokenSecret: process.env.CUSTOMER_ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.CUSTOMER_REFRESH_TOKEN_SECRET,
    adminAccessTokenSecret: process.env.ADMIN_ACCESS_TOKEN_SECRET,
    adminRefreshTokenSecret: process.env.ADMIN_REFRESH_TOKEN_SECRET,
    accessTokenExpiresIn: '1400m',
    refreshTokenExpiresIn: '7d',
    accessCookieMaxAge: 60 * 60 * 10000,
    refreshCookieMaxAge: 7 * 24 * 60 * 60 * 1000,
}