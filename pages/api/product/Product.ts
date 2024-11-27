import connectToDatabase from "@/lib/mongodb/db";
import { NextApiRequest, NextApiResponse } from "next";
import productPost from "@/utils/Routes/productRoutes/POST";
import getProduct from "@/utils/Routes/productRoutes/GET";

const CreateProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();

  if (req.method === "POST") {
    // Create a new product
    productPost(req, res);

  } else if (req.method === "GET") {
    // Get all products
    await getProduct(req, res);
  }else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default CreateProduct;

export const config = {
  api: {
    bodyParser: false,
  },
};
