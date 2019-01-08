const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const TerritorySchema = new Schema({
    code: {
        type: String,
        required: true    
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = Territory = mongoose.model('territories', TerritorySchema);