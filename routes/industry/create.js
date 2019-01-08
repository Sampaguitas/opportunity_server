const express = require('express');
const router = express.Router();
const fault = require('../../utilities/Errors')
const Industry = require('../../models/Industry');

router.post('/', (req, res) => {

    Industry.findOne({$or:[{ code: req.body.code},{name: req.body.name}]}).then(industry => {
        if (industry) {
            return res.status(400).json({
                message: fault(200).message
                //"200": "Industry already exists",
            });
        } else {

            const newIndustry = new Industry({
                code: req.body.code,
                name: req.body.name
            });

            newIndustry
                .save()
                .then(industry => res.json(industry))
                .catch(err => res.json(err));
        }
    });
});
module.exports = router;