export const EMPTY_PRODUCT = Object.freeze({
  id: "",
  productName: "",
  imageSource: "",
  price: 0,
  isAvailable: true,
  isPromoted: false,
  createdAt: "",
  lastUpdate: "",
  productType: "",
  quantity: 0
})

import { serverTimestamp } from "firebase/firestore"
export const SAMPLE_PRODUCTS = [
{
  id: "123",
  productName: "Produit 1",
  imageSource: "url A",
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
  imageSource: "url B",
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
  imageSource: "url C",
  price: 30.12,
  isAvailable: true,
  isPromoted: false,
  createdAt: new Date(),
  lastUpdate: new Date(),
  productType: "Burger",
  quantity: 100
},
]