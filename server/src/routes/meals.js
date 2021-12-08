const express = require("express");
const router = express.Router();
const MealTime = require("../models/MealTime");
const Meal = require("../models/Meal");

/**
 * @route GET /meals/me
 * @desc Get all meals for the current user
 * @access Private
 */

router.get("/me", async (req, res) => {
    const meals = await Meal.find({ user: req.user.id }).populate(
        "foodEntries"
    );
    res.json(meals);
});

/**
 * @route POST /meals
 * @desc Create a meal
 * @access Private
 */

router.post("/", async (req, res) => {
    const { name, foodEntries } = req.body;
    const meal = new Meal({
        name,
        foodEntries,
        user: req.user.id,
    });
    await meal.save();
    res.json(meal);
});

/**
 * @route GET /meals/me/times
 * @desc Gets current user's meal times
 * @access Private
 */

router.get("/me/times", async (req, res) => {
    const meals = await MealTime.find({ user: req.user.id });
    if (!meals) return res.status(404).json({ msg: "No meals found" });
    res.json(meals);
});

module.exports = router;
