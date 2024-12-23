import Image from "@/lib/schemas/Image";
import ProductDeatail from "@/lib/schemas/ProductDeatail";
import { Product } from "@/lib/schemas/SchemaUtils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function deleteProduct(req:NextApiRequest, res:NextApiResponse){

    if (req.query.id) {
        try {
            await Product.findByIdAndDelete(req.query.id);
            await ProductDeatail.findOneAndDelete({ProductId:req.query.id})
            await Image.findOneAndDelete({productId:req.query.id})
            res.status(200).json({message:"product deleted successfully"})
        } catch (error) {
            res.status(500).json({message:"error deleting product"})
        }
    }

}