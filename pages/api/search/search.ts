import { Product } from "@/lib/schemas/SchemaUtils"
import { NextApiRequest, NextApiResponse } from "next"

export default async function searchHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { search } = req.query

        const searchedproduct = await Product.find({
            $or: [
            { name: { $regex: search as string, $options: 'i' } },
            { description: { $regex: search as string, $options: 'i' } }
            ]
        })

        res.status(200).json({ message: `fetched according to search`, searchedproduct })
    } else {
        res.status(405).json({ message: 'Method Not Allowed' })
    }
}