import Product from "@/lib/schemas/Product";
import { NextApiRequest, NextApiResponse } from "next";

async function getProduct(req: NextApiRequest, res: NextApiResponse) {

    if (req.query.s) {
        try {
            const products = await Product.find({ category: req.query.s }).lean();

            return res.status(200).json(products);

        } catch (error) {
            return res.status(500).json({ error: "Error Fetching Products Via Category" });
        }
    }

    try {
        const products = await Product.find({}).lean();

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ error: "Error Fetching Products" });
    }
}

export default getProduct;