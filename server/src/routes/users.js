const express = require("express");
const router = express.Router();
const User = require("../models/user");

/**
 * @route   GET /user/:userId
 * @desc    Get user
 * @params  userId - user id
 * @access  Public
 */
router.get("/:userId", async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (!user)
        return res
            .status(404)
            .send("The user with the given ID was not found.");
    res.json(user);
});

/**
 * @route   POST /user
 * @desc    Create user
 * @params  None
 * @access  Public
 */

router.post("/", async (req, res) => {
    // todo: encrypt password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        height: req.body.height,
        weight: req.body.weight,
        dateOfBirth: req.body.dateOfBirth,
        goalWeight: req.body.goalWeight,
    });
    const savedUser = await user.save();
    res.json(savedUser);
});

module.exports = router;
