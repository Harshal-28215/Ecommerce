import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import ProductDeatail from "@/lib/schemas/ProductDeatail";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
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
    
    
        const { ProductDetails,sizeAndFit,materialAndCare,specifications,ProductId } = fields;
        
        try {
          const stringSpecifications = specifications
            ? JSON.parse(specifications)
            : [];
    
          const uploadedFiles = Array.isArray(files.images) ? files.images : [files.images];
          const images = uploadedFiles
            .filter((file) => file !== undefined)
            .map((file) => ({
              data: Buffer.from(fs.readFileSync(file.filepath)),
              contentType: file.mimetype,
            }));

          const product = new ProductDeatail({
            ProductDetails,
            sizeAndFit,
            materialAndCare,
            specifications:stringSpecifications,
            images:images,
            ProductId
          });
    
          await product.save();
          res.status(201).json({ message: "Product created successfully", product });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Error creating product" });
        }
      });
}