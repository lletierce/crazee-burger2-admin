import { Timestamp } from "firebase/firestore"


export type ProductType = {
  id: string;
  productName: string;
  price: number;
  imageSource: string;
  quantity: number;
  isAvailable: boolean;
  isPromoted: boolean;
  createdAt: Timestamp;
  lastUpdate: Timestamp;
  productType: string;
  slug: string,
};

export type ProductToAddType = {
  productName: string;
  price: number;
  imageSource: string;
  quantity: number;
  isAvailable: boolean;
  isPromoted: boolean;
  productType: string;
  createdAt?: Timestamp;
  lastUpdate?: Timestamp;
  slug?: string,
};

//export type ProductEditingType = Omit< ProductType, "id" | "createdAt" | "lastUpdate" | "slug">;
export type ProductEditingType = {
  productName: string;
  price: number;
  imageSource: string;
  quantity: number;
  isAvailable: boolean;
  isPromoted: boolean;
  productType: string;
}

export const IMAGE_NOT_AVAILABLE = "/images/img-not-available.jpg"

export const EMPTY_PRODUCT = Object.freeze({
  productName: "",
  price: 0,
  imageSource: "",
  quantity: 0,
  isAvailable: false,
  isPromoted: false,
  productType: "",
  createdAt: Timestamp.now(),
  lastUpdate: Timestamp.now(),
})

export const SAMPLE_PRODUCTS = [
  {
    id: "123",
    productName: "Produit 1",
    imageSource: "data:image/png;base64,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",
    price: 10.99,
    isAvailable: true,
    isPromoted: false,
    createdAt: new Date(),
    lastUpdate: new Date(),
    productType: "Burger",
    quantity: 100
  },
  {
    id: "456",
    productName: "Produit 2",
    imageSource: "https://s7d1.scene7.com/is/image/mcdonalds/Fanta_ZeroMedium:nutrition-calculator-tile?wid=472&hei=472&dpr=off",
    price: 20.50,
    isAvailable: true,
    isPromoted: false,
    createdAt: new Date(),
    lastUpdate: new Date(),
    productType: "Burger",
    quantity: 100
  },
  {
    id: "789",
    productName: "Produit 3",
    imageSource: "",
    price: 30.12,
    isAvailable: true,
    isPromoted: false,
    createdAt: new Date(),
    lastUpdate: new Date(),
    productType: "Burger",
    quantity: 100
  },
]