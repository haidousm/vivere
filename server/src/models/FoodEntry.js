const mongoose = require("mongoose");
const FoodEntrySchema = new mongoose.Schema({
    foodItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItem",
    },
    numberOfServings: {
        type: Number,
        required: true,
        min: 1,
    },
    totalCalories: {
        type: Number,
        required: true,
        min: 1,
    },
    mealTime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MealTime",
    },
    date: {
        type: Date,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("FoodEntry", FoodEntrySchema);
