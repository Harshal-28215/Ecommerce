import Category from "@/lib/schemas/Category";
import authenticate from "@/utils/Middleware/authentication";
import authorize from "@/utils/Middleware/authorization";
import { NextApiRequest, NextApiResponse } from "next";

async function createCategory(req: NextApiRequest, res: NextApiResponse) {

    const user = authenticate(req, res);
    if (!user) return res.status(401).json({ message: 'Unauthenticated' });

    const checkAuth = await authorize(['admin'],req,res,Category);
    if (!checkAuth) return res.status(403).json({ message: 'Unauthorized' });

    let { slug } = req.body;
    const { parentId,name } = req.body;

    try {
        Category.findOne({ name }).then((category) => {
            if (category) {
                return res.status(400).json({ error: 'Category name already exists' });
            }
        });

        if (!name) {
            return res.status(400).json({ error: 'Category name is required' });
        }

        
        const parent = parentId ? await Category.findById(parentId) : null;

        if (!slug) {
            slug = name.toLowerCase().replace(/ /g, '-');
        } else {
            slug = slug.toLowerCase().replace(/ /g, '-');
        }

        const newCategory = new Category({ name, parent, slug });
        await newCategory.save();

        return res.status(201).json(newCategory);

    } catch (error) {
        return res.status(500).json({ error: 'Error creating category',eMessage: error  });
    }
}

export default createCategory;