import { clsx, type ClassValue } from "clsx"
import { UseFormReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type productType = {
  _id: string,
  cardImage: {
    contentType: string;
    data: string;
  },
  price: number,
  name: string,
  description: string,
  category: string
}

export type categoryType = {
  _id: string;
  name: string;
  parent: string | null;
  slug: string;
  subcategories?: categoryType[];
}

export type userType = {
  email: string;
  name: string;
  id: string;
}

export type productform={
    form:UseFormReturn<any>
}