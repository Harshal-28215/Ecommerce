import Image from "@/lib/schemas/Image";
import formidable from "formidable";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default function addImage(req: NextApiRequest, res: NextApiResponse) {
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
                const image = files.images;

                const cardImage = { data: image ? Buffer.from(fs.readFileSync(image[0]?.filepath)) : null, contentType: image ? image[0].mimetype : null }

                const coverImage = new Image({
                    CardImage: cardImage,
                    productId: req.query.id
                })

                await coverImage.save()

                res.status(200).json({
                    message: "image created successfully",
                    coverImage
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