const express = require('express');
const router = express.Router();
const Industry = require('../../models/Industry');
const fault = require('../../utilities/Errors')


router.get('/', (req, res) => {
    var data = {};
    Object.keys(req.body).forEach(function (k) {
        data[k] = req.body[k];
    });

    Industry.find(data, function (err, industry) {
        if (!industry) {
            return res.status(400).json({
                message: fault(204).message
                //"204": "No Industry match",
            });
        }
        else {
            return res.json(industry);
        }
    });
});


module.exports = router;