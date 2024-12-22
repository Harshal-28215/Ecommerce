import connectToDatabase from "@/lib/mongodb/db";
import getImage from "@/utils/Routes/coverImageRoutes/GET";
import addImage from "@/utils/Routes/coverImageRoutes/POST";
import { NextApiRequest, NextApiResponse } from "next";

export default async function coverImage(req: NextApiRequest, res: NextApiResponse) {

    await connectToDatabase();

    if (req.method === "POST") {
        //adding product cover image including productId
        await addImage(req,res)
    }

    if (req.method === "GET") {
        // get cover image by id
        await getImage(req, res)
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};