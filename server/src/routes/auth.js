const express = require("express");
const passport = require("passport");

const router = express.Router();

const { generateSalt, generateHash } = require("../utils/password");
const User = require("../models/user");
const MealTime = require("../models/mealTime");

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
    const breakfast = new MealTime({
        user: savedUser._id,
        name: "Breakfast",
        order: 1,
    });
    const lunch = new MealTime({
        user: savedUser._id,
        name: "Lunch",
        order: 2,
    });
    const dinner = new MealTime({
        user: savedUser._id,
        name: "Dinner",
        order: 3,
    });
    await breakfast.save();
    await lunch.save();
    await dinner.save();
    req.login(savedUser, (err) => {
        if (err) {
            res.status(500).json({
                message: "Error logging in",
            });
        } else {
            res.json(savedUser);
        }
    });
});

module.exports = router;
