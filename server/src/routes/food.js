const express = require("express");
const FoodItem = require("../models/FoodItem");
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
