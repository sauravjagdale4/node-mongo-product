const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productName: {
        type: String,
        required: true,
        unique: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    categories: [String],
    allCategories: [String],
    createdDate: {
        type: Date,
        default: Date.now
    }
});

schema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Products', schema);