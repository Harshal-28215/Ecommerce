import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { productform } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type AddProductDetailProps = productform & {
    specifications: { title: string, about: string }[];
    setSpecifications: React.Dispatch<React.SetStateAction<{ title: string, about: string }[]>>;
};

function AddProductDetail({form,specifications,setSpecifications}:AddProductDetailProps) {

    const addRow = () => {
            setSpecifications([...specifications, { title: "", about: "" }]);
        };
    
        const removeRow = (index: number) => {
            const updated = [...specifications];
            updated.splice(index, 1);
            setSpecifications(updated);
        };
    
        const updateRow = (index: number, field: 'title' | 'about', value: string) => {
            const updated = [...specifications];
            updated[index][field] = value;
            setSpecifications(updated);
        };

    return (
        <>
            <FormField
                control={form.control}
                name="sizeAndFit"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Size & Fit</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Size & Fit"
                                type="text"
                                {...field} />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="ProductDetails"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Product Details</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Product Details"
                                {...field} />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="materialAndCare"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Material & Care</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Material & Care"
                                {...field} />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="specifications"
                render={() => (
                    <FormItem>
                        <FormLabel>Specifications</FormLabel>
                        <div>
                            {specifications.map((row, index) => (
                                <div key={index} className="flex items-center gap-4 mb-2">
                                    <Input
                                        placeholder="Title"
                                        value={row.title}
                                        onChange={(e) => updateRow(index, "title", e.target.value)}
                                    />
                                    <Input
                                        placeholder="About"
                                        value={row.about}
                                        onChange={(e) => updateRow(index, "about", e.target.value)}
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => removeRow(index)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button type="button" onClick={addRow}>
                                Add Specification
                            </Button>
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}

export default AddProductDetail
