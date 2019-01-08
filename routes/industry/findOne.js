const express = require('express');
const router = express.Router();
const fault = require('../../utilities/Errors');
const Industry = require('../../models/Industry');

router.get('/', (req, res) => {
    const id = req.query.id
    Industry.findById(id, function (err, industry) {
        if (!industry) {
            return res.status(404).json({
                message: fault(201).message
                //"201": "Industry does not exist",
            });
        }
        else {
            return res.json(industry);
        }
    });
});


module.exports = router;