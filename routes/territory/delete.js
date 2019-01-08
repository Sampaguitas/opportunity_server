const express = require('express');
const router = express.Router();
const Territory = require('../../models/Territory');
const fault = require('../../utilities/Errors')


router.delete('/', (req, res) => {
    const id = req.query.id
    Territory.findByIdAndRemove(id, function (err, industry) {
        if (!industry) {
            return res.status(400).json({
                message: fault(301).message
                //"301": "Territory does not exist",
            });
        }
        else {
            return res.status(200).json({
                message: fault(303).message,
                //"303": "Territory has been deleted",
            });
        }
    });
});

module.exports = router;