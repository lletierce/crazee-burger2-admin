import equal from "fast-deep-equal";
import type { ProductEditingType, ProductType } from "../enums/product";


export function toProductEditingType(
  product: ProductType
): ProductEditingType {
  const {
    productName,
    price,
    imageSource,
    quantity,
    isAvailable,
    isPromoted,
    productType,
  } = product;

  return {
    productName,
    price,
    imageSource,
    quantity,
    isAvailable,
    isPromoted,
    productType,
  };
}


export function isProductChanged ( 
        initial: ProductEditingType,
        current: ProductEditingType
    ): boolean {
  return !equal(initial, current);
}