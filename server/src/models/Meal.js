const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    foodItems: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "FoodItem",
            },
        ],
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
