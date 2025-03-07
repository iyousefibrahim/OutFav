const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        },
        selectedColor: { type: String, required: true },
        selectedSize: { type: String, required: true }
    }],
}, {
    versionKey: false,
    timestamps: true,
}
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;