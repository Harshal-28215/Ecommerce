import { Cart } from "@/lib/schemas/SchemaUtils";
import authenticate from "@/utils/Middleware/authentication";
import authorize from "@/utils/Middleware/authorization";
import { NextApiRequest, NextApiResponse } from "next";

export default async function deleteCart(req: NextApiRequest, res: NextApiResponse) {
    const user = authenticate(req, res);
    if (!user) return res.status(401).send("Invalid token");

    const isauthorize = await authorize(["admin"],req,res, Cart);
    if (!isauthorize) return res.status(403).send("Unauthorized");


    const { uid, pid } = req.query;
    if (pid) {
        try {
            await Cart.updateOne(
                { user: uid },
                { $pull: { products: pid } }
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