import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type productType = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  ProductDetails: string;
  sizeAndFit: string;
  materialAndCare: string;
  specifications: [
      {
          title: string;
          about: string;
      }
  ];
  images: [
      {
          data: Buffer;
          contentType: string;
      },
  ];
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

export async function getUser(){
  "use client"
  const response = await fetch('http://localhost:3000/api/user/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
  })

  console.log(response);
  

  if (response.ok) {
    return await response.json()
  }
  return null
}