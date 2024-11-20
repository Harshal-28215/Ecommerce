import connectToDatabase from "@/lib/mongodb/db";
import Category from "@/lib/schemas/Category";
import { NextApiRequest, NextApiResponse } from "next";

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToDatabase();

    try {
        if (req.method === 'GET') {
            // Fetch all categories
            const categories = await Category.find({});
            return res.status(200).json(categories);
        }

        if (req.method === 'POST') {
            // Create a new category
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({ error: 'Category name is required' });
            }

            const newCategory = new Category({ name });
            await newCategory.save();
            return res.status(201).json(newCategory);
        }

        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default POST;