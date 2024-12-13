import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongodb/db";
import { Cart } from "@/lib/schemas/SchemaUtils";
import authenticate from "@/utils/Middleware/authentication";
import authorize from "@/utils/Middleware/authorization";

const cartHandle = async (req: NextApiRequest, res: NextApiResponse) => {

    await connectToDatabase();

    if (req.method === "POST") {

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

    if (req.method === "GET") {

        const user = authenticate(req, res);
        if (!user) return res.status(401).send("Invalid token");

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

    if (req.method === "DELETE") {

        const user = authenticate(req, res);
        if (!user) return res.status(401).send("Invalid token");

        const isauthorize = authorize(["admin"])(req, res);
        if (!isauthorize) return res.status(403).send("Unauthorized");

        const { uid, pid } = req.query;

        if (pid) {
            try {
                await Cart.updateOne(
                    { user: uid },
                    { $pull:{ products: pid }}
                )                

                res.status(200).json({
                    massage: "product removed from cart"
                })
            } catch {
                res.status(500).json({
                    massage: "error removing product"
                })
            }
        } else {

            try {
                await Cart.findOneAndDelete({ user: uid })

                res.status(200).json({
                    massage: "Cart Cleared"
                })
            } catch (error) {
                res.status(500).json({ massage: "Error Deleting Category" })
            }
        }
    }

}

export default cartHandle;