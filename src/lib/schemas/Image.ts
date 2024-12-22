import mongoose from "mongoose";
import { Product } from "./SchemaUtils";

const ImageSchema = new mongoose.Schema({
    CardImage: {
        data: Buffer,
        contentType: String,
    },
    DetailImage: [{
        data: Buffer,
        contentType: String,
    }],
    productId: { type: mongoose.Schema.ObjectId, ref: Product },
})

export default mongoose.models.Image || mongoose.model("Image", ImageSchema);