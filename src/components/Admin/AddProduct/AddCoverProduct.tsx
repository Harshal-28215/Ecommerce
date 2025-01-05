import { productform, selectCategoryProp } from '@/utils/utils'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React, { useEffect } from 'react'
import SelectCategory from './SelectCategory';

type AddCoverProductProps = productform & selectCategoryProp

function AddCoverProduct({ form,selectedItem,setSelectedItem }: AddCoverProductProps) {
    const [categories, setCategories] = React.useState([]);

    useEffect(() => {
        function getCategories() {
            fetch('http://localhost:3000/api/category/CreateCategory', {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => setCategories(data))
        }
        getCategories();
    },[])

    return (
        <>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Name"

                                type="text"
                                {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Description"

                                type="text"
                                {...field} />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="price"

                                type="number"
                                {...field} />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )}
            />
            <SelectCategory selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
            {/* <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="category"
                                type="text"
                                {...field} />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )}
            /> */}
        </>
    )
}

export default AddCoverProduct
