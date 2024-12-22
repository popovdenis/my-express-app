const needRehash = (hash, currentSaltRounds) => {
    const hashRounds = parseInt(hash.split('$')[2], 10);
    return hashRounds < currentSaltRounds;
}

module.exports = { needRehash };