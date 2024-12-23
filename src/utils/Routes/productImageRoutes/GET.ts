import productImage from "@/lib/schemas/productImage"
import { NextApiRequest, NextApiResponse } from "next"

export default async function getProductImage(req: NextApiRequest, res: NextApiResponse) {
    if (req.query.id) {
        try {
            const image = await productImage.findOne({ productId: req.query.id }).lean()

            res.status(200).json({
                message: "image success fully fetched",
                image
            })
        } catch (error) {
            res.status(500).json({
                message: "error fetching image"
            })
        }
    }
}