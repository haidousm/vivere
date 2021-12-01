const express = require("express");
const router = express.Router();
const DiaryEntry = require("../models/diaryEntry");
const MealTime = require("../models/mealTime");

/**
 * @route GET /diary/:date
 * @desc Gets current user's diary for a specific date
 * @param date of diary to get in YYYY/MM/DD format
 * @access Private
 */

router.get("/:date", async (req, res) => {
    const date = req.params.date;
    const diaryEntry = await DiaryEntry.findOne({
        user: req.user.id,
        date: date,
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
});

/**
 * @route GET /diary/calories/:diaryEntryId
 * @desc Gets users total calories for a specific diary entry
 * @param diaryEntryId of diary entry to get
 * @access Private
 */

router.get("/calories/:diaryEntryId", async (req, res) => {
    const diaryEntryId = req.params.diaryEntryId;
    const diaryEntry = await DiaryEntry.findById(diaryEntryId);
    if (!diaryEntry) {
        res.status(404).send("Diary entry not found");
    }
    const foodEntries = diaryEntry.foodEntries;
    const totalCalories = foodEntries.reduce(
        (totalCalories, foodEntry) => totalCalories + foodEntry.calories,
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
                    return totalCalories + foodEntry.calories;
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
});

module.exports = router;
