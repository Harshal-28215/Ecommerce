import mongoose from "mongoose";

export const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }]
});
