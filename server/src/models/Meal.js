const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    foodEntries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FoodEntry",
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Meal", MealSchema);
