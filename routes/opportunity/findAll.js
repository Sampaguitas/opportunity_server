const express = require('express');
const router = express.Router();
const Opportunity = require('../../models/Opportunity');
const fault = require('../../utilities/Errors')


router.get('/', (req, res) => {
    var data = {};
    Object.keys(req.body).forEach(function (k) {
        data[k] = req.body[k];
    });
    
    Opportunity.find(data)
    .populate([
        {
            path: "industry",
            select: "code"
        },
        {
            path: "territory",
            select: "code"
        }
    ])
    .exec(function (err, opportunities) {
        if (!opportunities) {
            return res.status(400).json({
                message: fault(104).message
                //"104": "No opportunity match",
            });
        }
        else {
            let result = [];
            opportunities.forEach(opportunity => {
                let opp = opportunity.toObject();
                const month = (opportunity.date.getMonth() + 1).toString().padStart(2, '0');
                const year = opportunity.date.getFullYear().toString().padStart(4, '0');
                const number = opportunity.number.toString().padStart(5, '0');
                opp.code = year + month + '-' + opportunity.industry.code + opportunity.territory.code + '-' + number;
                
                delete opp.territory;
                delete opp.industry;
                delete opp.date;
                result.push(opp);
            })
            return res.json(result);
        }
        /* if (!opportunity) {
            return res.status(400).json({
                message: fault(104).message
                //"104": "No opportunity match",
            });
        }
        else {
            return res.json(opportunity);
        } */
    });
});


module.exports = router;