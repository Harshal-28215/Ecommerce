import Category from "@/lib/schemas/Category";
import authenticate from "@/utils/Middleware/authentication";
import authorize from "@/utils/Middleware/authorization";
import { NextApiRequest, NextApiResponse } from "next";

export default async function categoryDelete(req: NextApiRequest, res: NextApiResponse) {

    const user = authenticate(req, res);
    if (!user) return res.status(401).json({ message: 'Unauthenticated' });

    const checkAuth = await authorize(['admin'],req,res);
    if (!checkAuth) return res.status(403).json({ message: 'Unauthorized' });



    try {
        const deletedCategory = await Category.findByIdAndDelete(req.query.id);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}