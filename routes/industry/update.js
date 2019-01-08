const express = require('express');
const router = express.Router();
const Industry = require('../../models/Industry');
const fault = require('../../utilities/Errors')

router.put('/', (req, res) => {
    var data = {};

    Object.keys(req.body).forEach(function (k) {
        data[k] = req.body[k];
    });

    const id = req.query.id
    Industry.findByIdAndUpdate(id, { $set: data }, function (err, industry) {
        if (!industry) {
            return res.status(400).json({
                message: fault(201).message
                //"201": "Industry does not exist",
            });
        }
        else {
            return res.status(200).json({
                message: fault(202).message
                //"202": "Industry has been updated",
            });
        }
    });
});


module.exports = router;