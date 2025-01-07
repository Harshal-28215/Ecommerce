import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { Product } from "@/lib/schemas/SchemaUtils";
import authenticate from "@/utils/Middleware/authentication";
import authorize from "@/utils/Middleware/authorization";

async function productPost(req: NextApiRequest, res: NextApiResponse) {

  const user = authenticate(req, res);
    if (!user) return res.status(401).json({ message: 'Unauthenticated' });

    const checkAuth = await authorize(['admin'],req,res);
    if (!checkAuth) return res.status(403).json({ message: 'Unauthorized' });

  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields: Record<string, any>) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ error: "Error parsing form data" });
    }

    Object.keys(fields).forEach((key) => {
      if (Array.isArray(fields[key]) && fields[key].length === 1) {
        fields[key] = fields[key][0];
      }
    });


    const { name, description, price, category } = fields;
    
    
    try {
      const product = new Product({
        name,
        description,
        category,
        price: parseFloat(Array.isArray(price) ? price[0] : price || "0"),
      });

      await product.save();
      res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating product" });
    }
  });

}

export default productPost;