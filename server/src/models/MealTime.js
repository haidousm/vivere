const mongoose = require("mongoose");

const MealTimeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

MealTimeSchema.set("toJSON", {
    virtuals: true,
});

module.exports = mongoose.model("MealTime", MealTimeSchema);
