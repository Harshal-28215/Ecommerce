import connectToDatabase from "@/lib/mongodb/db";
import Category from "@/lib/schemas/Category";
import { NextApiRequest, NextApiResponse } from "next";

interface CategoryType {
    _id: string;
    name: string;
    parent: string | null;
    subcategories?: CategoryType[];
}

async function getCategoryWithSubcategories(categoryId: string): Promise<CategoryType | null> {
    const category = await Category.findById(categoryId).lean() as unknown as CategoryType;

    if (!category) return null;

    const subcategories = (await Category.find({ parent: category._id }).lean()).map(sub => ({
        _id: sub._id,
        name: sub.name,
        parent: sub.parent,
        subcategories: []
    })) as CategoryType[];

    const nestedSubcategories = await Promise.all(
        subcategories.map((sub) => getCategoryWithSubcategories(sub._id))
    );

    return {
        ...category,
        subcategories: nestedSubcategories.filter(sub => sub !== null) as CategoryType[],
    };
}

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToDatabase();

    try {
        if (req.method === 'GET') {
            if (req.query.id) {
                console.log("Requested ID:", req.query.id);

                const topLevelCategories =(await Category.find({parent: req.query.id}).lean()).map(category => ({
                    _id: category._id,
                    name: category.name,
                    parent: category.parent,
                    subcategories: []
                })) as CategoryType[];
                
                if (!topLevelCategories) {
                    return res.status(404).json({ error: "Category not found" });
                }

                const categoriesWithSubcategories = await Promise.all(
                    topLevelCategories.map((category: CategoryType) =>
                        getCategoryWithSubcategories(category._id)
                    )
                );
                return res.status(200).json(categoriesWithSubcategories);
            }
            // Fetch all top-level categories and their nested subcategories
            const topLevelCategories = (await Category.find({ parent: null }).lean()).map(category => ({
                _id: category._id,
                name: category.name,
                parent: category.parent,
                subcategories: []
            })) as CategoryType[];
            

            const categoriesWithSubcategories = await Promise.all(
                topLevelCategories.map((category: CategoryType) =>
                    getCategoryWithSubcategories(category._id)
                )
            );

            return res.status(200).json(categoriesWithSubcategories);
        }

        if (req.method === 'POST') {
            // Create a new category
            const { name, parentId } = req.body;

            Category.findOne({ name }).then((category) => {
                if (category) {
                    return res.status(400).json({ error: 'Category name already exists' });
                }
            });

            if (!name) {
                return res.status(400).json({ error: 'Category name is required' });
            }

            // Check if a parent category ID is provided, otherwise it's a top-level category
            const parent = parentId ? await Category.findById(parentId) : null;
            const slug = name.toLowerCase().replace(/ /g, '-');

            const newCategory = new Category({ name, parent, slug });
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