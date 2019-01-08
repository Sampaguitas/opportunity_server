const express = require('express');
const router = express.Router();
const Industry = require('../../models/Industry');
const fault = require('../../utilities/Errors')


router.delete('/', (req, res) => {
    const id = req.query.id
    Industry.findByIdAndRemove(id, function (err, industry) {
        if (!industry) {
            return res.status(400).json({
                message: fault(201).message
                //"201": "Industry does not exist",
            });
        }
        else {
            return res.status(200).json({
                message: fault(203).message,
                //"203": "Industry has been deleted",
            });
        }
    });
});

module.exports = router;