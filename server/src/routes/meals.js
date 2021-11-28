const express = require("express");
const Meal = require("../models/meal");
const User = require("../models/user");
const router = express.Router();

/**
 * @route   GET /meals/
 * @desc    Get meals for user
 * @access  Private
 */

router.get("/", async (req, res) => {
    if (!req.user) return res.status(401).send("Unauthorized");
    const meals = await Meal.find({ user: req.user._id });
    res.send(meals);
});

/**
 * @route   POST /meal
 * @desc    Create a new meal
 * @access  Private
 */
router.post("/", async (req, res) => {
    if (!req.user) return res.status(401).send("Unauthorized");
    const meal = new Meal({
        name: req.body.name,
        date: req.body.date,
        user: req.user._id,
    });
    await meal.save();
    res.send(meal);
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
