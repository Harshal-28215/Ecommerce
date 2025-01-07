import productImage from "@/lib/schemas/productImage";
import authenticate from "@/utils/Middleware/authentication";
import authorize from "@/utils/Middleware/authorization";
import formidable from "formidable";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function addProductImage(req: NextApiRequest, res: NextApiResponse) {
    const user = authenticate(req, res);
    if (!user) return res.status(401).json({ message: 'Unauthenticated' });

    const checkAuth = await authorize(['admin'],req,res);
    if (!checkAuth) return res.status(403).json({ message: 'Unauthorized' });

    const form = formidable({
        multiples: true,
        keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ error: "Error parsing form data" });
        }

        if (req.query.id) {

            try {
                const uploadedFiles = Array.isArray(files.images) ? files.images : [files.images];
                const images = uploadedFiles
                    .filter((file) => file !== undefined)
                    .map((file) => ({
                        data: Buffer.from(fs.readFileSync(file.filepath)),
                        contentType: file.mimetype,
                    }));

                    const addProductImage = new productImage({
                        DetailImage:images,
                        productId:req.query.id
                    })

                    await addProductImage.save()

                res.status(200).json({
                    message: "image created successfull",
                    addProductImage
                })
            } catch (error) {
                res.status(500).json({
                    message: "error creating image",
                    error
                })
            }
        }
    })
}