import { Cart } from "@/lib/schemas/SchemaUtils";
import authenticate from "@/utils/Middleware/authentication";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getCart(req: NextApiRequest, res: NextApiResponse) {
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