const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({

    customerName: { type: String, required: true },
    cart: { type: Array, },
    cartTotal: { type: Number, },
    checkedIn: { type: Boolean, default: false },
    tickets: { type: Number, },
    ticketsPrice: { type: Number, },
    subTotal: { type: Number, required: true },
    status: { type: String },
    timeSpent: { type: Array }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);

// orders

