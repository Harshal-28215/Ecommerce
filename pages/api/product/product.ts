import connectToDatabase from "@/lib/mongodb/db";
import Product from "../../../src/lib/schemas/Product";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";

const CreateProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();

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

    if (req.method === "POST") {

      const { name, description, price, category } = fields;

      try {
        if (!name) {
          return res.status(400).json({ error: "Name is required" });
        }

        
        const uploadedFiles = Array.isArray(files.images) ? files.images : [files.images];
        const images = uploadedFiles
          .filter((file) => file !== undefined)
          .map((file) => ({
            data: Buffer.from(fs.readFileSync(file.filepath)),
            contentType: file.mimetype,
          }));

        const product = new Product({
          name,
          description,
          price: parseFloat(Array.isArray(price) ? price[0] : price || "0"),
          category,
          images: images,
        });

        await product.save();
        res.status(201).json({ message: "Product created successfully", product });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating product" });
      }
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
};

export default CreateProduct;

export const config = {
  api: {
    bodyParser: false,
  },
};
