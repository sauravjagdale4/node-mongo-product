const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    categoryName: {
        type: String,
        required: true,
        unique : true
    },
    parentId: mongoose.Schema.Types.ObjectId,
    ancestors: [],
    createdDate: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Category', schema);