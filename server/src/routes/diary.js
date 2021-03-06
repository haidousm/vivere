const express = require("express");
const router = express.Router();
const passport = require("passport");
const DiaryEntry = require("../models/DiaryEntry");
const MealTime = require("../models/MealTime");
const FoodItem = require("../models/FoodItem");
const FoodEntry = require("../models/FoodEntry");

/**
 * @route GET /diary/:date
 * @desc Gets current user's diary for a specific date
 * @param date of diary to get in YYYY/MM/DD format
 * @access Private
 */

router.get(
    "/:date",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const date = req.params.date;
        const diaryEntry = await DiaryEntry.findOne({
            user: req.user.id,
            date: date,
        }).populate({
            path: "foodEntries",
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

        if (!diaryEntry) {
            const newDiaryEntry = new DiaryEntry({
                user: req.user.id,
                date: date,
            });
            await newDiaryEntry.save();
            return res.send(newDiaryEntry);
        }
        res.send(diaryEntry);
    }
);

/**
 * @route GET /diary/calories/:diaryEntryId
 * @desc Gets users total calories for a specific diary entry
 * @param diaryEntryId of diary entry to get
 * @access Private
 */

router.get(
    "/calories/:diaryEntryId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        if (!req.user) {
            return res.status(401).send("Unauthorized");
        }
        const diaryEntryId = req.params.diaryEntryId;
        const diaryEntry = await DiaryEntry.findById(diaryEntryId).populate({
            path: "foodEntries",
            populate: {
                path: "mealTime",
                model: "MealTime",
            },
        });

        if (!diaryEntry) {
            res.status(404).send("Diary entry not found");
        }
        const foodEntries = diaryEntry.foodEntries;
        const totalCalories = foodEntries.reduce(
            (totalCalories, foodEntry) =>
                totalCalories + foodEntry.totalCalories,
            0
        );
        const meals = await MealTime.find({ user: req.user.id });

        const mealsCalories = [];
        meals.forEach((meal) => {
            const mealCalories = {
                mealId: meal.id,
                calories: 0,
            };
            mealCalories.calories = foodEntries.reduce(
                (totalCalories, foodEntry) => {
                    if (foodEntry.mealTime.id === meal.id) {
                        return totalCalories + foodEntry.totalCalories;
                    }
                    return totalCalories;
                },
                0
            );
            mealsCalories.push(mealCalories);
        });

        res.json({
            totalCalories,
            mealsCalories,
        });
    }
);

/**
 * @route POST /diary/food
 * @desc Creates a new food entry for a specific diary entry
 * @access Private
 */

router.post(
    "/food",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const foodItem = await FoodItem.findById(req.body.foodItem.id);
        const diaryEntry = await DiaryEntry.findById(req.body.diaryId);
        const mealTime = await MealTime.findById(req.body.mealTime.id);

        let foodEntry = {};
        if (req.body.id) {
            foodEntry = await FoodEntry.findById(req.body.id);
            foodEntry.foodItem = foodItem;
            foodEntry.numberOfServings = req.body.numberOfServings;
            foodEntry.totalCalories = req.body.totalCalories;
            foodEntry.mealTime = mealTime;
            await foodEntry.save();
        } else {
            foodEntry = new FoodEntry({
                foodItem: foodItem,
                numberOfServings: req.body.numberOfServings,
                totalCalories: req.body.totalCalories,
                mealTime: mealTime,
                date: diaryEntry.date,
                user: req.user.id,
            });
            await foodEntry.save();
            diaryEntry.foodEntries.push(foodEntry);
            await diaryEntry.save();
        }

        res.json(foodEntry);
    }
);

/**
 * @route POST /diary/food/batch
 * @desc Creates a batch of food entries for a specific diary entry
 * @access Private
 */

router.post(
    "/food/batch",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const foodEntries = req.body.foodEntries;
        const diaryEntry = await DiaryEntry.findById(req.body.diaryId);

        let newFoodEntries = [];

        for (foodEntry of foodEntries) {
            const foodItem = foodEntry.foodItem;
            const mealTime = foodEntry.mealTime;

            const newFoodEntry = new FoodEntry({
                foodItem: foodItem,
                numberOfServings: foodEntry.numberOfServings,
                totalCalories: foodEntry.totalCalories,
                mealTime: mealTime,
                date: diaryEntry.date,
                user: req.user.id,
            });

            await newFoodEntry.save();
            diaryEntry.foodEntries.push(newFoodEntry);
        }

        await diaryEntry.save();

        res.json(diaryEntry);
    }
);

/**
 * @route DELETE /diary/food/:diaryEntryId/:foodEntryId
 * @desc Delete a food entry for a specific diary entry
 * @access Private
 */

router.delete(
    "/food/:diaryEntryId/:foodEntryId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const diaryEntry = await DiaryEntry.findById(req.params.diaryEntryId);
        const foodEntry = await FoodEntry.findById(req.params.foodEntryId);
        diaryEntry.foodEntries.pull(foodEntry);
        await diaryEntry.save();
        await foodEntry.remove();
        res.json(diaryEntry);
    }
);

module.exports = router;
