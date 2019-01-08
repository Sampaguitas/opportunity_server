const express = require('express');
const router = express.Router();
const fault = require('../../utilities/Errors')
const Opportunity = require('../../models/Opportunity');

router.post('/', (req, res) => {

    Opportunity.findOne({$and:[{territory: req.body.territory},{industry: req.body.industry},{number: req.body.number}]})
    .then(opportunity => {
        if (opportunity) {
            return res.status(400).json({
                message: fault(100).message
            });
        } else {

            const newOpportunity = new Opportunity({
                territory: req.body.territory,
                industry: req.body.industry
            });

            newOpportunity
                .save()
                .then(opportunity =>{
                    opportunity.populate([
                        {
                            path: "industry",
                            select: "code"
                        },
                        {
                            path: "territory",
                            select: "code"
                        }
                    ], function (err, populatedOpportunity) {
                        if (err) {
                            Opportunity.remove({_id : opportunity._id}).exec();
                            return res.status(400).json({
                                message: fault(105).message
                            });
                        }
                        const month = (populatedOpportunity.date.getMonth() + 1).toString().padStart(2, '0');
                        const year = populatedOpportunity.date.getFullYear().toString().padStart(4, '0');
                        const number = populatedOpportunity.number.toString().padStart(5, '0');
                        const code = year + month + '-' + populatedOpportunity.industry.code + populatedOpportunity.territory.code + '-' + number;
                        populatedOpportunity.code = code;
                        Opportunity.findOneAndUpdate({ _id: populatedOpportunity._id }, { $set: { code: code } }).exec()
                            return res.json(populatedOpportunity);
                    })
                    /* opportunity.populate([
                        {
                            path: "industry",
                            select: "code"
                        },
                        {
                            path: "territory",
                            select: "code"
                        }
                    ]).exec((err, populatedOpportunity) => {
                        if (err) {
                            return next(err);
                        }
                        const month = (populatedOpportunity.date.getMonth() + 1).toString().padStart(2, '0');
                        const year = populatedOpportunity.date.getFullYear().toString().padStart(4, '0');
                        const number = populatedOpportunity.number.toString().padStart(5, '0');
                        populatedOpportunity.code = year + month + '-' + populatedOpportunity.industry.code + populatedOpportunity.territory.code + '-' + number;
                        return res.json(opportunity)
                    }) */
                }) 
                .catch(err => res.json(err));
        }
    });
});
module.exports = router;