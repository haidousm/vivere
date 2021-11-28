const express = require("express");
const Meal = require("../models/meal");
const User = require("../models/user");
const router = express.Router();

/**
 * @route   GET /meal/:username
 * @desc    Get meals for a user
 * @params  username - username
 * @access  Public
 */

router.get("/:username", async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    const meals = await Meal.find({ user: user._id });
    return res.json(meals);
});

/**
 * @route   POST /meal
 * @desc    Create a new meal
 * @params  None
 * @access  Public
 */
router.post("/", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    const newMeal = new Meal({
        user: user._id,
        name: req.body.name,
        date: req.body.date,
    });
    const meal = await newMeal.save();
    return res.json(meal);
});

/**
 * @route   PUT /meal/:id
 * @desc    Update a meal
 * @params  id - meal id
 * @access  Public
 */
router.put("/:id", async (req, res) => {
    const meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ msg: "Meal not found" });
    meal.foodItems = req.body.foodItems;
    const updatedMeal = await meal.save();
    return res.json(updatedMeal);
});

/**
 * @route   DELETE /meal/:id
 * @desc    Delete a meal
 * @params  id - meal id
 * @access  Public
 */
router.delete("/:id", async (req, res) => {
    const meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ msg: "Meal not found" });
    await meal.remove();
    return res.json({ msg: "Meal removed" });
});

module.exports = router;
