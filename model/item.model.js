const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        data: Buffer,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }, 
    vital: {
        type: Number,
    }
    
});

module.exports = mongoose.model("Item", itemSchema);

// items
