"use client"

import * as React from "react"

import { categoryType, cn } from "@/utils/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import EditCategory from "./EditCategory"
import { Divide } from "lucide-react"

export default function NavigationMenuDemo({ category }: { category: categoryType[] }) {

    return (
        <NavigationMenu>
            <NavigationMenuList>
                {category.map((category: categoryType) => (
                    <NavigationMenuItem key={category._id}>
                        <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
                        <NavigationMenuContent className="z-30">
                            <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-6 w-[70vw]"
                            >
                                {category.subcategories && category.subcategories.map((subcategory) => (
                                    <div key={subcategory._id}>
                                        <div className="flex">
                                            <ListItem
                                                className="py-1 hover:bg-transparent font-extrabold uppercase"
                                                href={`/category/${encodeURIComponent(subcategory.name || 'unknown')}?s=${subcategory.slug}`}
                                                title={subcategory.name || 'Unknown Category'}
                                            />
                                            <EditCategory categoryname={subcategory.name} categoryslug={subcategory.slug} categoryid={subcategory._id}/>
                                        </div>
                                        {subcategory.subcategories &&
                                            subcategory.subcategories.map((nestedSubcategory) => (
                                                <div key={nestedSubcategory._id} className="flex justify-between">
                                                    <ListItem
                                                        className="py-0 hover:bg-transparent text-slate-500 hover:font-extrabold hover:underline"
                                                        href={`/category/${encodeURIComponent(nestedSubcategory.name)}?s=${encodeURIComponent(nestedSubcategory.slug)}`}
                                                        title={nestedSubcategory.name || 'Unknown Subcategory'}
                                                    />
                                                    <EditCategory categoryname={nestedSubcategory.name} categoryslug={nestedSubcategory.slug} categoryid={nestedSubcategory._id}/>
                                                </div>
                                            ))}
                                    </div>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link href=""
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
