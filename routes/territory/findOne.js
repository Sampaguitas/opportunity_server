const express = require('express');
const router = express.Router();
const fault = require('../../utilities/Errors');
const Territory = require('../../models/Territory');

router.get('/', (req, res) => {
    const id = req.query.id
    Territory.findById(id, function (err, territory) {
        if (!territory) {
            return res.status(404).json({
                message: fault(301).message
                //"301": "Territory does not exist",
            });
        }
        else {
            return res.json(territory);
        }
    });
});


module.exports = router;