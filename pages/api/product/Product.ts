import connectToDatabase from "@/lib/mongodb/db";
import { NextApiRequest, NextApiResponse } from "next";
import productPost from "@/utils/Routes/productRoutes/POST";

const CreateProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();

  if (req.method === "POST") {

    productPost(req, res);

  } else {
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
