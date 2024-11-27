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
        slug: sub.slug,
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

async function getCategory(req: NextApiRequest, res: NextApiResponse) {
    if (req.query.slug) {
        try {

            const topLevelCategories = (await Category.find({ slug: req.query.slug }).lean()).map(category => ({
                _id: category._id,
                name: category.name,
                parent: category.parent,
                slug: category.slug,
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
        } catch (error) {
            return res.status(500).json({ error: "Error Fetching Category Via id" });
        }

    }

    try {
        // Fetch all top-level categories and their nested subcategories
        const topLevelCategories = (await Category.find({ parent: null }).lean()).map(category => ({
            _id: category._id,
            name: category.name,
            parent: category.parent,
            slug: category.slug,
            subcategories: []
        })) as CategoryType[];


        const categoriesWithSubcategories = await Promise.all(
            topLevelCategories.map((category: CategoryType) =>
                getCategoryWithSubcategories(category._id)
            )
        );

        return res.status(200).json(categoriesWithSubcategories);
    } catch (error) {
        return res.status(500).json({ error: "Error Fetching Categories" });
    }
}

export default getCategory;