const express = require("express");
const passport = require("passport");

const router = express.Router();

const {
    generateSalt,
    generateHash,
    issueJWT,
    validatePassword,
} = require("../utils/authUtils");
const User = require("../models/user");
const MealTime = require("../models/MealTime");

/**
 * @route POST /auth/login
 * @desc Login user
 * @access Public
 */

router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    if (validatePassword(req.body.password, user.hash, user.salt)) {
        const token = issueJWT(user);
        return res.status(200).json({ token });
    }
    return res.status(400).json({ message: "Invalid credentials" });
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
        goalCalories: req.body.goalCalories,
    });
    try {
        const savedUser = await user.save();
        const breakfast = new MealTime({
            user: savedUser.id,
            name: "Breakfast",
            order: 1,
        });
        const lunch = new MealTime({
            user: savedUser.id,
            name: "Lunch",
            order: 2,
        });
        const dinner = new MealTime({
            user: savedUser.id,
            name: "Dinner",
            order: 3,
        });
        await breakfast.save();
        await lunch.save();
        await dinner.save();

        const token = issueJWT(user);
        res.status(200).send(token);
    } catch (err) {
        res.status(500).json({
            message: err,
        });
    }
});

module.exports = router;
