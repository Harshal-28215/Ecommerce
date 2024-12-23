import mongoose from "mongoose";
import { Product } from "./SchemaUtils";

const ProductDetailsSchema = new mongoose.Schema({
    ProductDetails: { type: String, required: true },
    sizeAndFit: { type: String },
    materialAndCare: { type: String },
    ProductId: { type: mongoose.Schema.Types.ObjectId, ref: Product },
    specifications: [
        {
            title: { type: String },
            about: { type: String }
        }
    ],
});

export default mongoose.models.ProductDetails || mongoose.model("ProductDetails", ProductDetailsSchema);