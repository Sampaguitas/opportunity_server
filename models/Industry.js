const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const IndustrySchema = new Schema({
    code:{
        type: String,
        required: true        
    },
    name: {
        type: String,
        required: true
    }
});



module.exports = Industry = mongoose.model('industries', IndustrySchema);