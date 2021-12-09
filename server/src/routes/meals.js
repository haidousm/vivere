const express = require("express");
const router = express.Router();
const passport = require("passport");
const MealTime = require("../models/MealTime");
const Meal = require("../models/Meal");

/**
 * @route GET /meals/me
 * @desc Get all meals for the current user
 * @access Private
 */

router.get(
    "/me",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        if (!req.user) return res.status(401).send("Unauthorized");
        const meals = await Meal.find({ user: req.user.id }).populate({
            path: "foodEntries",
            model: "FoodEntry",
            populate: [
                {
                    path: "mealTime",
                    model: "MealTime",
                },
                {
                    path: "foodItem",
                    model: "FoodItem",
                },
            ],
        });
        res.json(meals);
    }
);

/**
 * @route POST /meals
 * @desc Create a meal
 * @access Private
 */

router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const { name, foodEntries } = req.body;
        const meal = new Meal({
            name,
            foodEntries,
            user: req.user.id,
        });
        await meal.save();
        res.json(meal);
    }
);

/**
 * @route DELETE /meals/:id
 * @desc Delete a meal
 * @access Private
 */

router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const meal = await Meal.findById(req.params.id);
        if (!meal) return res.status(404).json({ msg: "Meal not found" });
        await meal.delete();
        res.json({ msg: "Meal deleted" });
    }
);

/**
 * @route GET /meals/me/times
 * @desc Gets current user's meal times
 * @access Private
 */

router.get(
    "/me/times",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        if (!req.user) return res.status(401).send("Unauthorized");
        const meals = await MealTime.find({ user: req.user.id });
        if (!meals) return res.status(404).json({ msg: "No meals found" });
        res.json(meals);
    }
);

module.exports = router;
