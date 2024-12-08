import connectToDatabase from "@/lib/mongodb/db";
import { GET } from "@/utils/Routes/productDetailsRoutes/GET";
import { POST } from "@/utils/Routes/productDetailsRoutes/POST";
import { NextApiRequest, NextApiResponse } from "next";

const productDetailPost = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToDatabase();

    try {
        if (req.method === "POST") {
            await POST(req, res);
        }
        else if (req.method === "GET") {
            await GET(req, res);
        }
    } catch (error) {
        res.status(500).json({ error: "Error creating product" });
    }

}

export default productDetailPost;

export const config = {
    api: {
        bodyParser: false,
    },
};