const express = require("express");
const router = express.Router();
const DiaryEntry = require("../models/diaryEntry");
/**
 * @route GET /diary/:date
 * @desc Gets current user's diary for a specific date
 * @param date of diary to get in YYYY/MM/DD format
 * @access Private
 */

router.get("/:date", async (req, res) => {
    const date = req.params.date;
    const diaryEntry = await DiaryEntry.findOne({
        user: req.user.id,
        date: date,
    });

    if (!diaryEntry) {
        const newDiaryEntry = new DiaryEntry({
            user: req.user.id,
            date: date,
        });
        await newDiaryEntry.save();
        return res.send(newDiaryEntry);
    }
    res.send(diaryEntry);
});

module.exports = router;
