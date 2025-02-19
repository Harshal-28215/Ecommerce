import connectToDatabase from "@/lib/mongodb/db";
import categoryDelete from "@/utils/Routes/categoryRoutes/DELETE";
import getCategory from "@/utils/Routes/categoryRoutes/GET";
import createCategory from "@/utils/Routes/categoryRoutes/POST";
import categoryUpdate from "@/utils/Routes/categoryRoutes/PUT";
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
        await categoryUpdate(req, res);

    }else if (req.method === 'DELETE') {

        // Delete a category
        await categoryDelete(req, res);
        
    }
    else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
}

export default CreateCategory;