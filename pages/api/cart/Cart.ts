import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mongodb/db";
import getCart from "@/utils/Routes/cartRoutes/GET";
import addCart from "@/utils/Routes/cartRoutes/POST";
import deleteCart from "@/utils/Routes/cartRoutes/DELETE";

const cartHandle = async (req: NextApiRequest, res: NextApiResponse) => {

    await connectToDatabase();

    if (req.method === "POST") {
        //add cart to the database
        await addCart(req, res);
    }
    else if (req.method === "GET") {
        //get cart from the database
        await getCart(req, res);
    }
    else if (req.method === "DELETE") {
        //delete cart from the database or delete product form cart
        await deleteCart(req, res);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }

}

export default cartHandle;