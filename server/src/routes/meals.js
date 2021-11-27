const express = require("express");
const Meal = require("../models/meal");
const router = express.Router();

/**
 * @route   GET /meal/:userId
 * @desc    Get meals for a user
 * @params  userId - user id
 * @access  Public
 */

router.get("/:userId", async (req, res) => {
    const meals = await Meal.find({ user: req.params.userId });
    return res.json(meals);
});

/**
 * @route   POST /meal
 * @desc    Create a new meal
 * @params  None
 * @access  Public
 */
router.post("/", async (req, res) => {
    const newMeal = new Meal({
        user: req.body.userId,
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
