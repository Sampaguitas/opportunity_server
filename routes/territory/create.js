const express = require('express');
const router = express.Router();
const fault = require('../../utilities/Errors')
const Territory = require('../../models/Territory');

router.post('/', (req, res) => {

    Territory.findOne({$or:[{code: req.body.code},{name: req.body.name}]}).then(territory => {
        if (territory) {
            return res.status(400).json({
                message: fault(300).message
                //"300": "Territory already exists",
            });
        } else {

            const newTerritory = new Territory({
                code: req.body.code,
                name: req.body.name
            });

            newTerritory
                .save()
                .then(territory => res.json(territory))
                .catch(err => res.json(err));
        }
    });
});
module.exports = router;