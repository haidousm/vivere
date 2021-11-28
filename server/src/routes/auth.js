const express = require("express");
const router = express.Router();

const { generateSalt, generateHash } = require("../utils/password");
const User = require("../models/user");
const passport = require("passport");

/**
 * @route POST /auth/login
 * @desc Login user
 * @access Public
 */

router.post("/login", passport.authenticate("local"), (req, res) => {
    if (req.user) {
        res.status(200).json({
            message: "User logged in successfully",
            user: req.user,
        });
    } else {
        res.status(401).json({
            message: "Invalid credentials",
        });
    }
});

/**
 * @route POST /auth/register
 * @desc Register a new user
 * @access Public
 */
router.post("/register", async (req, res) => {
    const salt = generateSalt();
    const hash = generateHash(req.body.password, salt);
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        hash: hash,
        salt: salt,
        height: req.body.height,
        weight: req.body.weight,
        dateOfBirth: req.body.dateOfBirth,
        goalWeight: req.body.goalWeight,
    });
    const savedUser = await user.save();
    res.json(savedUser);
});

module.exports = router;
