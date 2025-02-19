import { NextApiRequest, NextApiResponse } from "next";
import Category from "@/lib/schemas/Category";
import { Product } from "@/lib/schemas/SchemaUtils";

async function getProduct(req: NextApiRequest, res: NextApiResponse) {
  
    if (req.query.s) {
    const slug = req.query.s as string;
  
    try {

      const categories = await Category.aggregate([
        {
            $match: { slug }, // Match the root category by slug
          },
          {
            $graphLookup: {
              from: "categories", // Name of the category collection
              startWith: "$_id", // Start from the matched category's ID
              connectFromField: "_id", // Field to follow for recursion
              connectToField: "parent", // Field to match parent-child relationships
              as: "allCategories", // Output array of categories
            },
          },
          {
            $project: {
              slugs: {
                $concatArrays: [
                  ["$slug"], // Include the root category's slug
                  "$allCategories.slug", // Include all subcategories' slugs
                ],
              },
            },
          },
      ]);

      console.log(slug);
      
  
      if (!categories.length) {
          return res.status(404).json({ error: "Category not found" });
        }
        
      // Extract the slugs from the aggregation result
      const slugs = categories[0].slugs;

      // Find products using the slugs
      const products = await Product.find({
        category: { $in: slugs }, // Assuming the `category` field in products stores the slug
      }).lean();

        return res.status(200).json(products);

    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ error: "Error fetching products via category" });
    }

}
    try {
        const products = await Product.find({}).lean();

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ error: "Error Fetching Products",eMessage: error  });
    }
}

export default getProduct;