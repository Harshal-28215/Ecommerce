import mongoose from "mongoose";
import { ProductSchema } from "./Product";
import { CartSchema } from "./Cart";

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export { Product, Cart };
