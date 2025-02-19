import { categoryType, selectCategoryProp } from '@/utils/utils';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SelectCategory = ({ setSelectedItem, setSelectedItemId }: selectCategoryProp) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [category, setCategory] = useState<categoryType[]>([]);
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
    const [selected, setSelected] = useState<string | null>(null);

    const params = usePathname();
    console.log(params);



    useEffect(() => {
        fetch('http://localhost:3000/api/category/CreateCategory', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => setCategory(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedQuery(searchQuery), 300);
        return () => clearTimeout(handler);
    }, [searchQuery]);


    const filteredItems = category.flatMap((item) => {
        const matchedItems = [];

        if (item.name.toLowerCase().includes(debouncedQuery.toLowerCase())) {
            matchedItems.push({ ...item, subcategories: [] });
        }

        if (item.subcategories) {
            item.subcategories.forEach((subcategory) => {
                if (subcategory.slug.toLowerCase().includes(debouncedQuery.toLowerCase())) {
                    matchedItems.push({ ...subcategory, subcategories: [] });
                }

                if (subcategory.subcategories && params === '/admin/addproduct') {
                    subcategory.subcategories.forEach((nestedSubcategory) => {
                        if (nestedSubcategory.slug.toLowerCase().includes(debouncedQuery.toLowerCase())) {
                            matchedItems.push(nestedSubcategory);
                        }
                    });
                }
            });
        }

        return matchedItems;
    });



    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (slug: string, id: string) => {
        if (setSelectedItemId) setSelectedItemId(id);
        if (setSelectedItem) setSelectedItem(slug);

        setSelected(slug);
        setIsOpen(false);
        setSearchQuery('');
    };

    return (
        <div className="relative w-64">
            <div
                onClick={toggleDropdown}
                className="w-full bg-gray-200 p-2 rounded shadow focus:outline-none"
            >
                {selected || 'Select Category'}
            </div>
            {isOpen && (
                <div className="absolute z-10 mt-2 w-full bg-white border rounded shadow">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 border-b focus:outline-none"
                    />
                    <div className="max-h-40 overflow-y-auto">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <div key={item._id}>
                                    <div
                                        className="p-2 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSelect(item.slug, item._id)}
                                    >
                                        {item.slug}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-2 text-gray-500">No items found</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectCategory;
