const express = require('express');
const router = express.Router();
const Opportunity = require('../../models/Opportunity');
const fault = require('../../utilities/Errors')

router.put('/', (req, res) => {
    var data = {};

    Object.keys(req.body).forEach(function (k) {
        data[k] = req.body[k];
    });

    const id = req.query.id
    Opportunity.findByIdAndUpdate(id, { $set: data }, function (err, opportunity) {
        if (!opportunity) {
            return res.status(400).json({
                message: fault(101).message
                //"101": "opportunity does not exist",
            });
        }
        else {
            return res.status(200).json({
                message: fault(102).message
                //"102": "opportunity has been updated",
            });
        }
    });
});


module.exports = router;