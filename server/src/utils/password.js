const crypto = require("crypto");

const validatePassword = (password, hash, salt) => {
    const hashPassword = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");
    return hashPassword === hash;
};

const generateSalt = () => {
    return crypto.randomBytes(16).toString("hex");
};

const generateHash = (password, salt) => {
    return crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");
};

module.exports = {
    validatePassword,
    generateSalt,
    generateHash,
};
