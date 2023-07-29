const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        res.json([global.foodItems, global.foodCategory]);

    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;