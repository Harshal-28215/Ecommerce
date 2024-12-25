import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongodb/db";
import getWhishlist from "@/utils/Routes/whishlistRoutes/GET";
import addwhishlist from "@/utils/Routes/whishlistRoutes/POST";
import deleteWhishlist from "@/utils/Routes/whishlistRoutes/DELETE";

const whishlisthandle = async (req: NextApiRequest, res: NextApiResponse) => {

    await connectToDatabase();

    if (req.method === "POST") {
        //add whishlist to the database
        await addwhishlist(req, res);
    }
    else if (req.method === "GET") {
        //get whishlist from the database
        await getWhishlist(req, res);
    }
    else if (req.method === "DELETE") {
        //delete whishlist from the database or delete product form whishlist
        await deleteWhishlist(req, res);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }

}

export default whishlisthandle;