import mongoose from "mongoose";

export const WhishListSchema = new mongoose.Schema({
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

export default mongoose.models.WhishList || mongoose.model("WhishList", WhishListSchema);