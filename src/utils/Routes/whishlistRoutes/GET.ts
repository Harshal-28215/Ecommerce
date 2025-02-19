import WhishList from "@/lib/schemas/WhishList";
import authenticate from "@/utils/Middleware/authentication";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getWhishlist(req: NextApiRequest, res: NextApiResponse) {
    const user = authenticate(req, res);
    if (!user) return res.status(401).send("Invalid token");

    const userID = req.query.uid as string;

    try {
        const whishlist = await WhishList.findOne({ user: userID }).populate("products").lean();

        if (!whishlist) {
            res.status(404).json({ message: "Cart not found for this user" });
        }

        const products = whishlist && !Array.isArray(whishlist) && whishlist.products ? whishlist.products : [];

        res.status(200).json({
            message: "Cart fetched successfully",
            products,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart",eMessage: error  });
    }
}