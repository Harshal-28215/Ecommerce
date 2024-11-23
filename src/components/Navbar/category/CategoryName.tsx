import Link from 'next/link';

type CategoryType = {
  _id: string;
  name: string;
  parent: string | null;
  subcategories?: CategoryType[];
}

function CategoryName({ category }: { category: CategoryType[] }) {

  return (
    <div>
      {category.map((category) => (
        <>
          <Link href={{ pathname: `/category/${category.name}`, query: { id: category._id } }} key={category._id}>{category.name}</Link>
          {category.subcategories && category.subcategories.map((subcategory) => (
            <div key={subcategory._id}>
              <Link href={{ pathname: `/category/${subcategory.name}`, query: { id: subcategory._id } }}>{subcategory.name}</Link>
            </div>
          ))}
        </>
        
      ))}
    </div>
  )
}

export default CategoryName
