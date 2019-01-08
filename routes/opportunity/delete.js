const express = require('express');
const router = express.Router();
const Opportunity = require('../../models/Opportunity');
const fault = require('../../utilities/Errors')


router.delete('/', (req, res) => {
    const id = req.query.id
    Opportunity.findByIdAndRemove(id, function (err, opportunity) {
        if (!opportunity) {
            return res.status(400).json({
                message: fault(101).message
                //"101": "Opportunity does not exist",
            });
        }
        else {
            return res.status(200).json({
                message: fault(103).message,
                //"103": "Opportunity has been deleted", 
            });
        }
    });
});

module.exports = router;