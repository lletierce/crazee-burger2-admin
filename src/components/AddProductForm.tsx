import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useState, type FormEvent } from "react";
import { db } from "../api/firebase-config";

type Product = {
  productName: string;
  price: number;
  imageSource: string;
  quantity: number;
  isAvailable: boolean;
  isPromoted: boolean;
  createdAt: Timestamp;
  lastUpdate: Timestamp;
  productType: string;
};
export default function AddProductForm() {

  // Omit<T, K> -> prends le type T, mais enlève les propriétés K
  const [product, setProduct] = useState<Omit<Product, "createdAt" | "lastUpdate">>({
    productName: "",
    price: 0,
    imageSource: "",
    quantity: 0,
    isAvailable: false,
    isPromoted: false,
    productType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const now = new Date();

    const productToSave: Product = {
      ...product,
      createdAt: Timestamp.fromDate(now),
      lastUpdate: Timestamp.fromDate(now),
    };

    try {
      await addDoc(collection(db, "products"), productToSave);
      console.log("Produit ajouté avec succès !");
      setProduct({
        productName: "",
        price: 0,
        imageSource: "",
        quantity: 0,
        isAvailable: false,
        isPromoted: false,
        productType: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 max-w-md mx-auto border rounded shadow-md space-y-3"
    >
      <h2 className="text-xl font-bold mb-2">Ajouter un produit</h2>

      <input
        type="text"
        name="productName"
        placeholder="Nom du produit"
        value={product.productName}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Prix"
        value={product.price}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        name="imageSource"
        placeholder="URL de l'image"
        value={product.imageSource}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="number"
        name="quantity"
        placeholder="Quantité"
        value={product.quantity}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isAvailable"
          checked={product.isAvailable}
          onChange={handleChange}
        />
        Disponible
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isPromoted"
          checked={product.isPromoted}
          onChange={handleChange}
        />
        En promotion
      </label>

      <select
        name="productType"
        value={product.productType}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Choisir un type</option>
        <option value="burger">Burger</option>
        <option value="boisson">Boisson</option>
        <option value="dessert">Déssert</option>
        <option value="accompagnement">Accompagnement</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
      >
        Ajouter
      </button>
    </form>
  )
}