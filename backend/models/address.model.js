const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: [true, 'Please provide an order ID']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user ID']
    },
    address: {
        type: String,
        required: [true, 'Please provide an address']
    },
    city: {
        type: String,
        required: [true, 'Please provide a city']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide a phone number']
    },
}, {
    versionKey: false,
    timestamps: true,
}
);

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;