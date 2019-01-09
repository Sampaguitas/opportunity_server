const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const OpportunitySchema = new Schema({
    territory:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'territories'
    },
    industry: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'industries'
    },
    number:{
        type: Number,
        /* required: true */
    },
    date: {
        type: Date,
        default: Date.now
    },
    code: {
        type: String
    }
});

OpportunitySchema.index({ code: 1 }, { unique: true, sparse : true });

OpportunitySchema.pre("save", function (next) {
    var self = this;
    
    this.constructor.count({
        industry: this.industry,
        territory: this.territory
        /* year : this.date.getFullYear(),
        date  : (this.date.getMonth() + 1) */
    }).exec(function(err, data) {
        if (err) {
            return next(err);
        }
        console.log('pre update count===', data);
        self.number = data + 1;
        return next();
    });
})



/* OpportunitySchema.virtual("name").get(function () {
    const month = (this.date.getMonth() + 1).toString().padStart(2, '0');
    const year = this.date.getFullYear().toString().padStart(4, '0');
    const number = this.number.toString().padStart(5, '0');
    return year + month + '-' + this.industry + this.territory + '-' + number;
}); */

OpportunitySchema.set('toJSON', { virtuals: true });

module.exports = Opportunity = mongoose.model('opportunities', OpportunitySchema);