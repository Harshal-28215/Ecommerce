import Image from "@/lib/schemas/Image";
import ProductDeatail from "@/lib/schemas/ProductDeatail";
import { Product } from "@/lib/schemas/SchemaUtils";
import authenticate from "@/utils/Middleware/authentication";
import authorize from "@/utils/Middleware/authorization";
import { NextApiRequest, NextApiResponse } from "next";

export default async function deleteProduct(req: NextApiRequest, res: NextApiResponse) {

    const user = authenticate(req, res);
    if (!user) return res.status(401).send("Invalid token");

    const isauthorize = await authorize(["admin"], Product)(req, res);
    if (!isauthorize) return res.status(403).send("Unauthorized");

    if (req.query.id) {
        try {
            await Product.findByIdAndDelete(req.query.id);
            await ProductDeatail.findOneAndDelete({ ProductId: req.query.id })
            await Image.findOneAndDelete({ productId: req.query.id })
            res.status(200).json({ message: "product deleted successfully" })
        } catch (error) {
            res.status(500).json({ message: "error deleting product" })
        }
    }

}