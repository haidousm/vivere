const express = require("express");
const router = express.Router();
const MealTime = require("../models/mealTime");

/**
 * @route GET /meals/me
 * @desc Gets current user's meal times
 * @access Private
 */

router.get("/me", async (req, res) => {
    const meals = await MealTime.find({ user: req.user.id });
    if (!meals) return res.status(404).json({ msg: "No meals found" });
    res.json(meals);
});

module.exports = router;
