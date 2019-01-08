const express = require('express');
const router = express.Router();
const Territory = require('../../models/Territory');
const fault = require('../../utilities/Errors')


router.get('/', (req, res) => {
    var data = {};
    Object.keys(req.body).forEach(function (k) {
        data[k] = req.body[k];
    });

    Territory.find(data, function (err, territory) {
        if (!territory) {
            return res.status(400).json({
                message: fault(304).message
                //"304": "No Territory match",
            });
        }
        else {
            return res.json(territory);
        }
    });
});


module.exports = router;