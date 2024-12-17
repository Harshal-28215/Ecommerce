import ProductDeatail from "@/lib/schemas/ProductDeatail";
import { NextApiRequest, NextApiResponse } from "next";


export const GET = async (req: NextApiRequest, res: NextApiResponse) => {    
    try {
        if (req.query.id) {
            

            const ProductId = req.query.id as string;
            const products = await ProductDeatail.find({ ProductId }).populate('ProductId').lean();
            return res.status(200).json(products);
        }else{
            res.status(400).json({ error: "Product Id is required" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error Fetching Products" });
    }

}