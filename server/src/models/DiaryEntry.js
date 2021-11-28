const mongoose = require("mongoose");

const DiaryEntrySchema = new mongoose.Schema({
    date: {
        type: Date,
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
        required: true,
    },
});

module.exports = mongoose.model("DiaryEntry", DiaryEntrySchema);
