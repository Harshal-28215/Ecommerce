import mongoose from "mongoose";
import { Product } from "./SchemaUtils";

const ProductImageSchema = new mongoose.Schema({
    DetailImage: [{
        data: Buffer,
        contentType: String,
    }],
    productId: { type: mongoose.Schema.ObjectId, ref: Product },
})

export default mongoose.models.ProductImage || mongoose.model("ProductImage", ProductImageSchema);