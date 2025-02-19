import { productType } from '@/utils/utils';
import Product from '../Product/Product';

async function SearchedProduct({search}:{search:string}) {
    
let products = [];

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search/search?search=${search}`, {
                method: "GET",
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json()
            products = data.searchedproduct
        } catch (error) {
            console.error('Failed to fetch products:', error);
            products = [];
        }

    return (
        <main className='flex gap-2 p-[10px] flex-wrap'>
            {products?.map((product: productType) => (
                <Product product={product} key={product._id} />
            ))}
        </main>
    )
}

export default SearchedProduct
