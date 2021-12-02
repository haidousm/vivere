const mongoose = require("mongoose");
const FoodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    caloriesPerServing: {
        type: Number,
        required: true,
    },
    servingSize: {
        type: String,
        required: true,
    },
    importedID: {
        type: String,
        required: false,
    },
    GTIN13: {
        type: String,
        required: false,
    },
});

FoodItemSchema.set("toJSON", {
    virtuals: true,
});

module.exports = mongoose.model("FoodItem", FoodItemSchema);
