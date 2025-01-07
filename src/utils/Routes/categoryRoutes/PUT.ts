import Category from "@/lib/schemas/Category";
import authenticate from "@/utils/Middleware/authentication";
import authorize from "@/utils/Middleware/authorization";
import { NextApiRequest, NextApiResponse } from "next";


export default async function categoryUpdate(req: NextApiRequest, res: NextApiResponse) {

    const user = authenticate(req, res);
    if (!user) return res.status(401).json({ message: "Not authenticated" });

    const cheackauth = authorize(["admin"],req,res,Category);
    if (!cheackauth) return res.status(403).json({ message: "Unauthorized" });

    try {
        const updateCategory = await Category.findByIdAndUpdate(req.query.id, req.body, { new: true });
        res.status(200).json(updateCategory);
    } catch (error) {
        res.status(400).json({ message: "Error updating category" });
    }
}
