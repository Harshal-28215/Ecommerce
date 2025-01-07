import connectToDatabase from "@/lib/mongodb/db";
import Category from "@/lib/schemas/Category";
import getCategory from "@/utils/Routes/categoryRoutes/GET";
import createCategory from "@/utils/Routes/categoryRoutes/POST";
import { NextApiRequest, NextApiResponse } from "next";

const CreateCategory = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToDatabase();
    if (req.method === 'GET') {
        // Get all categories or categories with id
        await getCategory(req, res);
    } else if (req.method === 'POST') {
        // Create a new category
        createCategory(req, res);
    } else if (req.method === 'PUT') {
        // Update a category
        console.log(req.body);
        
        const updateCategory = await Category.findByIdAndUpdate(req.query.id, req.body, { new: true });
        res.status(200).json(updateCategory);
    }
    else {
        // Handle unsupported methods
        res.setHeader('Allow', ['GET', 'POST']); // Specify allowed methods
        res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
}

export default CreateCategory;