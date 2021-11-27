const mongoose = require("mongoose");

const DiaryEntrySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    meals: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Meal",
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

module.exports = mongoose.model("DiaryEntry", DiaryEntrySchema);
