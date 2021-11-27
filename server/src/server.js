const express = require("express");
const mongoose = require("mongoose");
const app = express();
const FoodItem = require("./models/FoodItem");

const mongoUri = `mongodb+srv://new-user_31:lana123@cluster0.x4n3c.mongodb.net/vivere?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

app.get("/", (req, res) => {
    FoodItem.find({}, (err, foodItems) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(foodItems);
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
