import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  ProductDetails: { type: String, required: true },
  sizeAndFit: { type: String },
  materialAndCare: { type: String },
  specifications: [
    {
      title: { type: String },
      about: { type: String }
    }
  ],
  images: [
    {
      data: { type: Buffer, required: true },
      contentType: { type: String, required: true },
    },
  ],
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;