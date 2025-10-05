const mongoose = require('mongoose');

const order = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    book : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books',
    },

    status: {
        type: String,
        ref: 'books',
        default:'Ordered placed',
        enum: ['Ordered placed', 'Shipped', 'Out for delivery', 'Delivered', 'Cancelled']
    }
},
{timestamps: true}
);

module.exports = mongoose.model('order', order);