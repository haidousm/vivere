const express = require("express");
const FoodItem = require("../models/FoodItem");
const FoodEntry = require("../models/FoodEntry");
const router = express.Router();

/**
 * @route   GET /food
 * @desc    Get food items
 * @params  num - number of items to return | search - search term
 * @access  Public
 */
router.get("/", async (req, res) => {
    const num = parseInt(req.query.num) || 10;
    const search = req.query.search || "";
    try {
        const foodItems = await FoodItem.find({
            name: { $regex: search, $options: "i" },
        }).limit(num);
        res.json(foodItems);
    } catch (err) {
        res.status(500).send(err);
    }
});

/**
 * @route   GET /food/recent
 * @desc    Get recent food items
 * @params  num - number of items to return
 * @access  Private
 */

router.get("/recent", async (req, res) => {
    const num = parseInt(req.query.num) || 10;
    const foodEntries = await FoodEntry.find({
        user: req.user.id,
    })
        .populate("foodItem")
        .sort({ date: -1 });

    if (!foodEntries) {
        const num = parseInt(req.query.num) || 10;
        const foodItems = await FoodItem.find({
            name: { $regex: search, $options: "i" },
        }).limit(num);
        return res.json(foodItems);
    }

    const foodItems = foodEntries.map((entry) => entry.foodItem);
    const uniqueFoodItems = foodItems.filter(
        (foodItem, index, self) =>
            index === self.findIndex((t) => t.id === foodItem.id)
    );

    res.json(uniqueFoodItems.slice(0, num));
});

/**
 * @route   GET /food/:GTIN13
 * @desc    Get food item by GTIN13
 * @params  GTIN13
 * @access  Public
 */
router.get("/:GTIN13", async (req, res) => {
    const foodItem = await FoodItem.findOne({
        GTIN13: req.params.GTIN13,
    });
    if (!foodItem) return res.status(404).json({ msg: "Food item not found" });
    return res.json(foodItem);
});

module.exports = router;
