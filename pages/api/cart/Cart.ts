import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongodb/db";
import { Cart } from "@/lib/schemas/SchemaUtils";

const cartHandle = async (req: NextApiRequest, res: NextApiResponse) => {

    await connectToDatabase();

    if (req.method === "POST") {
        try {

            const { userID, productID } = req.body;

            let cart = await Cart.findOne({ user: userID });

            if (cart) {
                
                if (!cart.products.includes(productID)) {
                    
                    cart = await Cart.findByIdAndUpdate(
                        cart._id,
                        { $push: { products: productID } },
                        { new: true }
                    );
                    res.status(200).json({ message: "Product added to cart", cart });
                } else {
                    res.status(200).json({ message: "Product already in cart", cart });
                }
            } else {
                const cart = new Cart({ user: userID, products: [productID] });

                await cart.save();
                res.status(201).json({ message: "Product added to cart", cart });
            }


        } catch (error) {
            res.status(500).json({ message: "Error adding product to cart" });
        }
    }

    if (req.method === "GET") {
        const userID = req.query.uid as string;        

        try {                        
            const cart = await Cart.findOne({ user: userID }).populate("products").lean();            
            
            if (!cart) {
                res.status(404).json({ message: "Cart not found for this user" });
            }
            
            const products = cart && !Array.isArray(cart) && cart.products ? cart.products : [];
            
            res.status(200).json({
                message: "Cart fetched successfully",
                products,
            });
        } catch (error) {
            res.status(500).json({ message: "Error fetching cart" });
        }
    }

}

export default cartHandle;