import { Timestamp } from "firebase/firestore";
import { useState, type FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ADD_PRODUCT_FAIL_MESSAGE, ADD_PRODUCT_SUCCESS_MESSAGE, DEFAULT_TOAST_OPTIONS } from "../enums/toast";
import { addProduct, doesProductExistBySlug } from "../api/menuService";
import { EMPTY_PRODUCT, type ProductToAddType, type ProductType } from "../enums/product";
import { slugify } from "../utils/string";


export default function AddProductForm() {

  // Omit<T, K> -> prends le type T, mais enlève les propriétés K
  // const [product, setProduct] = useState<Omit<ProductType, "id" | "createdAt" | "lastUpdate" | "slug">>(EMPTY_PRODUCT);
  const [product, setProduct] = useState<ProductToAddType>(EMPTY_PRODUCT);


  const [errors, setErrors] = useState<Partial<Record<keyof ProductType, string>>>({});


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log({[name]: value})
  }

  const validate = () => {
    const newErrors: Partial<Record<keyof ProductType, string>> = {};

    if (!product.productName.trim()) {
      newErrors.productName = "Le nom du produit est requis";
    }

    if (product.price < 0) {
      newErrors.price = "Le prix doit être supérieur ou égal à 0";
    }

    if (product.quantity < 0) {
      newErrors.quantity = "La quantité doit être supérieure ou égale à 0";
    }

    if (!product.productType) {
      newErrors.productType = "Le type de produit est requis";
    }

    return newErrors;
  }

  const resetForm = () => {
    setProduct(EMPTY_PRODUCT);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // clean les erreurs si tout va bien

    if (await doesProductExistBySlug(slugify(product.productName))) {
      
      // setErrors(() => ({
      //   productName: "Ce produit existe déjà",
      // }));
      toast.error("Un produit du même nom existe déjà", DEFAULT_TOAST_OPTIONS)
      return;
    }

    const now = new Date();
    const productToAdd: ProductToAddType = {
      ...product,
      createdAt: Timestamp.fromDate(now),
      lastUpdate: Timestamp.fromDate(now),
      slug: slugify(product.productName)
    };

    try {
      addProduct(productToAdd)
      toast.success(ADD_PRODUCT_SUCCESS_MESSAGE, DEFAULT_TOAST_OPTIONS)
      resetForm()
    }
    catch (err) {
      toast.error(ADD_PRODUCT_FAIL_MESSAGE, DEFAULT_TOAST_OPTIONS)
    }

    // console.log(product)
  }

  return (
    <div className="bg-gray-50 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="
          bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg
          flex flex-col gap-6
        "
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          🛍️ Ajouter un produit
        </h2>

        {/* Nom du produit */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Nom du produit<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="productName"
            value={product ? product.productName : ""}
            onChange={handleChange}
            placeholder="Ex: Burger"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>

        {/* URL de l'image */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Image (URL)</label>
          <input
            type="url"
            name="imageSource"
            value={product ? product.imageSource : ""}
            onChange={handleChange}
            placeholder="https://exemple.com/mon-produit.jpg"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        {/* Catégorie | productType */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Catégorie<span className="text-red-500">*</span></label>
          <select
            name="productType"
            value={product.productType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">Choisir une catégorie</option>
            <option value="burger">Burger</option>
            <option value="boisson">Boisson</option>
            <option value="accompagnement">Accompagnement</option>
          </select>
          <p className="text-red-500 text-sm">{errors.productType}</p>
        </div>

        {/* Prix */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Prix (€)<span className="text-red-500">*</span></label>
          <input
            type="number"
            name="price"
            value={product ? product.price : 0}
            onChange={handleChange}
            placeholder="Ex: 49.99"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>


        {/* Quantité */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Quantité<span className="text-red-500">*</span></label>
          <input
            type="number"
            name="quantity"
            value={product ? product.quantity : 0}
            onChange={handleChange}
            placeholder="Ex: 100"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
          {errors.quantity && (<p className="text-red-500 text-sm">{errors.quantity}</p>)}
        </div>

        {/* Disponibilité */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Disponibilité<span className="text-red-500">*</span></label>
          <select
            name="isAvailable"
            value={product.isAvailable ? "true" : "false"}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                isAvailable: e.target.value === "true",
              }))
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition cursor-pointer"
          >
            <option value="true">Disponible</option>
            <option value="false">Non disponible</option>
          </select>
        </div>

        {/* Promouvoir */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Promouvoir<span className="text-red-500">*</span></label>
          <select
            name="isAvailable"
            value={product.isPromoted ? "true" : "false"}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                isPromoted: e.target.value === "true",
              }))
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="true">Avec publicité</option>
            <option value="false">Sans publicité</option>
          </select>
        </div>



        {/* Bouton d’envoi */}
        <button
          type="submit"
          className="
            bg-blue-600 text-white font-semibold py-2 rounded-lg cursor-pointer
            hover:bg-blue-700 transition 
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        >
          Ajouter
        </button>
      </form>
      <div className="bg-gray-400">
        {product?.imageSource ? (<img src={product.imageSource} alt={"image-preview"} />) : (<div className="h-[300px] w-[300px] flex items-center justify-center border border-amber-300">Aucune Image</div>)}
      </div>
      <ToastContainer />
    </div>
  );

}

/*
return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-3xl">Ajouter un nouveau produit</h1>
        <div className="grid grid-cols-[3fr_1fr] grid-rows-5 gap-4 w-[70%] mt-4">
          <div className="[grid-area:1/1/5/2] grid grid-rows-5 grid-cols-3 gap-4">
            <div className="[grid-area:1/1/2/4]">
              <input
                type="text"
                name="productName"
                placeholder="Nom du produit"
                value={product.productName}
                onChange={handleChange}
                className="text-xl w-full bg-gray-400"
              />
              {errors.productName && (<p className="text-red-500 text-sm">{errors.productName}</p>)}
            </div>
            <div className="[grid-area:2/1/3/4] bg-gray-400">
              <input
                type="text"
                name="imageSource"
                placeholder="Lien URL d'une image"
                value={product.imageSource}
                onChange={handleChange}
                className="text-xl  w-full"
              />
            </div>
            <div className="[grid-area:3/1/4/2] bg-amber-400">
              <input
                type="number"
                name="price"
                placeholder="Prix"
                // value={product.price ? product.price : ""}
                value={product.price}
                onChange={handleChange}
                className="text-xl  w-full"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </div>
            <div className="[grid-area:3/2/4/3] bg-green-400">
              <input
                type="number"
                name="quantity"
                placeholder="Quantité"
                value={product.quantity}
                onChange={handleChange}
                className="text-xl  w-full"
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm">{errors.quantity}</p>
              )}
            </div>
            <div className="[grid-area:3/3/4/4] bg-red-400 text-xl  w-full" >
              <select
                name="isAvailable"
                value={product.isAvailable ? "true" : "false"}
                onChange={(e) =>
                  setProduct((prev) => ({
                    ...prev,
                    isAvailable: e.target.value === "true",
                  }))
                }
                className="w-full p-2 border rounded"
              >
                <option value="true">Disponible</option>
                <option value="false">Non Disponible</option>
              </select>
            </div>
            <div className="[grid-area:4/1/5/2] bg-orange-400 text-xl  w-full">
              <select
                name="productType"
                value={product.productType}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Choisir un type</option>
                <option value="burger">Burger</option>
                <option value="boisson">Boisson</option>
                <option value="accompagnement">Accompagnement</option>
              </select>
              {errors.productType && (
                <p className="text-red-500 text-sm">{errors.productType}</p>
              )}
            </div>
            <div className="[grid-area:5/1/6/2] bg-purple-400 text-xl  w-full">
              <select
                name="isPromoted"
                value={product.isPromoted ? "true" : "false"}
                onChange={(e) =>
                  setProduct((prev) => ({
                    ...prev,
                    isPromoted: e.target.value === "true",
                  }))
                }
                className="w-full p-2 border rounded"
              >
                <option value="true">Avec pub</option>
                <option value="false">Sans pub</option>
              </select>
            </div>
          </div>
          <div className="[grid-area:1/2/-2/3] bg-gray-400">
            {product.imageSource ? (<img src={product.imageSource} alt={"image-preview"} />) : (<div className="h-[300px] w-[300px] flex items-center justify-center border border-amber-300">Aucune Image</div>)}
          </div>
          <div className="[grid-area:5/1/-2/3]  flex items-center justify-end-safe">
            <button className="text-lg font-semibold cursor-pointer border-2 px-2" type="submit">Ajouter</button>
          </div>
        </div>
      </form>
    </div>
  )
*/