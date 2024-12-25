import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { productform } from '@/utils/utils';
import React from 'react'

function AddCoverImage({ form }: productform) {
    return (
        <FormField
            control={form.control}
            name="cardImage"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Card Image</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="Card Image"
                            type="file"
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

export default AddCoverImage
