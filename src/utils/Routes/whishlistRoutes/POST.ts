import WhishList from "@/lib/schemas/WhishList";
import authenticate from "@/utils/Middleware/authentication";
import { NextApiRequest, NextApiResponse } from "next";

export default async function addwhishlist(req: NextApiRequest, res: NextApiResponse) {
    const user = authenticate(req, res);
    if (!user) return res.status(401).send("Invalid token");

    try {

        const { userID, productID } = req.body;

        let whishlist = await WhishList.findOne({ user: userID });

        if (whishlist) {

            if (!whishlist.products.includes(productID)) {

                whishlist = await WhishList.findByIdAndUpdate(
                    whishlist._id,
                    { $push: { products: productID } },
                    { new: true }
                );
                res.status(200).json({ message: "Product added to cart", whishlist });
            } else {
                await WhishList.updateOne(
                    { user: userID },
                    { $pull: { products: productID } }
                )

                res.status(200).json({
                    massage: "product removed from cart"
                })
            }
        } else {
            const cart = new WhishList({ user: userID, products: [productID] });

            await cart.save();
            res.status(201).json({ message: "Product added to cart", cart });
        }


    } catch (error) {
        res.status(500).json({ message: "Error adding product to cart" });
    }
}