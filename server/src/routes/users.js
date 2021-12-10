const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");

/**
 * @route GET /users/me
 * @desc Get current user
 * @access Private
 */
router.get(
    "/me",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        if (!req.user)
            return res.status(401).send({ error: "You must be logged in" });
        try {
            const user = await User.findById(req.user.id);
            res.send(user);
        } catch (err) {
            res.status(500).send(err);
        }
    }
);

/**
 * @route PUT /users/me
 * @desc Update current user
 * @access Private
 */
router.put(
    "/me",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        if (!req.user)
            return res.status(401).send({ error: "You must be logged in" });
        try {
            const user = await User.findByIdAndUpdate(req.user.id, req.body, {
                new: true,
                runValidators: true,
            });
            res.json(user);
        } catch (err) {
            res.status(500).send(err);
        }
    }
);

/**
 * @route GET /users/logout
 * @desc Logout user
 * @access Private
 */
router.get(
    "/logout",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        req.logout();
        res.send({ message: "You are logged out" });
    }
);

module.exports = router;
