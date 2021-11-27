const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    foodItems: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "FoodItem",
            },
        ],
        required: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
