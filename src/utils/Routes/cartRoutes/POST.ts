import { Cart } from "@/lib/schemas/SchemaUtils";
import authenticate from "@/utils/Middleware/authentication";
import { NextApiRequest, NextApiResponse } from "next";

export default async function addCart(req: NextApiRequest, res: NextApiResponse) {
    const user = authenticate(req, res);
        if (!user) return res.status(401).send("Invalid token");

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