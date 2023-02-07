const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({

    customerName: { type: String, required: true },
    cart: { type: Array, required: true },
    cartTotal: { type: Number, required: true },
    checkedIn: { type: Boolean, default: false },
    subTotal: { type: Number, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);

// orders

