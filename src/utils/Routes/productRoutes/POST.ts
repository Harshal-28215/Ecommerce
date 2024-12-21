import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import { Product } from "@/lib/schemas/SchemaUtils";

function productPost(req: NextApiRequest, res: NextApiResponse) {

  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields: Record<string, any>, files) => {
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
    const cardImage = files.cardImage;
    
    
    try {
      const cardimage = { data: cardImage ? Buffer.from(fs.readFileSync(cardImage[0]?.filepath)) : null, contentType: cardImage ? cardImage[0]?.mimetype : null };

      const product = new Product({
        name,
        description,
        category,
        cardImage: cardimage,
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