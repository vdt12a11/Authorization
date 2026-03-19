const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tankSchema = new Schema({
    product_name: {
        type: String,
        required: true
    },
    max_height: {
        type: String,
        required: true
    }
    ,
    max_volume: {
        type: String,
        required: true
    }
    ,
    density: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Tank', tankSchema);