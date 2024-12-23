import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { productform } from '@/lib/utils';

function AddProductDetailImage({form}:productform) {
    return (
        <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="Product Image"
                            type="file"
                            multiple
                            onChange={(e) => {
                                field.onChange(e.target.files);
                            }}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default AddProductDetailImage
