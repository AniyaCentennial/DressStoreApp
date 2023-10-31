import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
        trim: true  // Removes any leading or trailing whitespace
    },
    description: {
        type: String,
        required: 'Description is required',
        trim: true
    },
    price: {
        type: Number,
        required: 'Price is required',
        min: 0  // Ensures that the price cannot be negative
    },
    quantity: {
        type: Number,
        required: 'Quantity is required',
        min: 0  // Ensures that the quantity cannot be negative
    },
    category: {
        type: String,
        required: 'Category is required',
        trim: true
    }
});

export default mongoose.model('Product', ProductSchema);
