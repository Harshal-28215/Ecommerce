import { productType } from '@/utils/utils';
import Product from '../Product/Product';

async function SearchedProduct({search}:{search:string}) {
    

        const response = await fetch(`http://localhost:3000/api/search/search?search=${search}`, {
            method: "GET",
        })

        const data = await response.json()
        const products = data.searchedproduct

    return (
        <main className='flex gap-2 p-[10px] flex-wrap'>
            {products?.map((product: productType) => (
                <Product product={product} key={product._id} />
            ))}
        </main>
    )
}

export default SearchedProduct
