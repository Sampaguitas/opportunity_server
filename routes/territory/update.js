const express = require('express');
const router = express.Router();
const Territory = require('../../models/Territory');
const fault = require('../../utilities/Errors')

router.put('/', (req, res) => {
    var data = {};

    Object.keys(req.body).forEach(function (k) {
        data[k] = req.body[k];
    });

    const id = req.query.id
    Territory.findByIdAndUpdate(id, { $set: data }, function (err, territory) {
        if (!territory) {
            return res.status(400).json({
                message: fault(301).message
                //"301": "Territory does not exist",
            });
        }
        else {
            return res.status(200).json({
                message: fault(302).message
                //"302": "Territory has been updated",
            });
        }
    });
});


module.exports = router;