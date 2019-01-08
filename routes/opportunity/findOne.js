const express = require('express');
const router = express.Router();
const fault = require('../../utilities/Errors');
const Opportunity = require('../../models/Opportunity');

router.get('/', (req, res) => {
    const id = req.query.id
    Opportunity.findById(id, function (err, opportunity) {
        if (!opportunity) {
            return res.status(404).json({
                message: fault(101).message
                //"101": "opportunity does not exist",
            });
        }
        else {
            return res.json(opportunity);
        }
    });
});


module.exports = router;
