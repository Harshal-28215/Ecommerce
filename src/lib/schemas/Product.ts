import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  images: [
    {
      data: { type: Buffer, required: true },
      contentType: { type: String, required: true },
    },
  ],
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;