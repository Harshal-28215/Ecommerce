import connectToDatabase from "@/lib/mongodb/db";
import getProductImage from "@/utils/Routes/productImageRoutes/GET";
import addProductImage from "@/utils/Routes/productImageRoutes/POST";
import { NextApiRequest, NextApiResponse } from "next";

export default async function coverImage(req: NextApiRequest, res: NextApiResponse) {

    await connectToDatabase();

    if (req.method === "POST") {
        //adding product cover image including productId
        await addProductImage(req,res)
    }

    if (req.method === "GET") {
        // get cover image by id
        await getProductImage(req, res)
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};