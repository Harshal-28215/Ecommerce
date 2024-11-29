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