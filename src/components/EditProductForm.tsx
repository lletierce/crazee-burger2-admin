import { useState } from "react";
import { useProduct } from "../context/ProductContext";
import { updateProduct } from "../api/menuService";
import { Timestamp, type DocumentData } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import { DEFAULT_TOAST_OPTIONS, EDIT_PRODUCT_FAIL_MESSAGE, EDIT_PRODUCT_SUCCESS_MESSAGE } from "../enums/toast";

export default function EditProductForm() {

  const { productSelected, setProductSelected } = useProduct();

  const [productEdited, setProductEdited] = useState<DocumentData>(productSelected);
  const [errors, setErrors] = useState<Partial<Record<keyof DocumentData, string>>>({});
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setProductEdited((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const validate = () => {
      const newErrors: Partial<Record<keyof DocumentData, string>> = {};
  
      // Déjà géré par la prop "required" ici
      // if (!productEdited.productName.trim()) {
      //   newErrors.productName = "Le nom du produit est requis";
      // }
  
      if (productEdited.price < 0) {
        newErrors.price = "Le prix doit être supérieur ou égal à 0";
      }
  
      if (productEdited.quantity < 0) {
        newErrors.quantity = "La quantité doit être supérieure ou égale à 0";
      }
  
      if (!productEdited.productType) {
        newErrors.productType = "La catégorie de produit est requis";
      }
  
      return newErrors;
    }

  
  const updateProductSelected = (UpdatedProdcut: DocumentData) => { 
    setProductSelected(UpdatedProdcut)
   }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // clean les erreurs si tout va bien
    
    const now = new Date();
    const productToEdit: DocumentData = {
          ...productEdited,
          lastUpdate: Timestamp.fromDate(now),
        };

    try {
      updateProduct(productSelected.id, productToEdit)
      updateProductSelected(productToEdit)
      toast.success(EDIT_PRODUCT_SUCCESS_MESSAGE, DEFAULT_TOAST_OPTIONS)
      //console.log("Produit modifié :", productSelected);

    }
    catch(err){
    console.log("erreur lors de la modif :", err);
    toast.error(EDIT_PRODUCT_FAIL_MESSAGE, DEFAULT_TOAST_OPTIONS)
    }
  };


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
          🛍️ Modifier un produit
        </h2>

        {/* Nom du produit */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Nom du produit<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="productName"
            value={productEdited ? productEdited.productName : ""}
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
            value={productEdited ? productEdited.imageSource : ""}
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
            value={productEdited.productType}
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
            value={productEdited ? productEdited.price : 0}
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
            value={productEdited ? productEdited.quantity : 0}
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
            value={productEdited.isAvailable ? "true" : "false"}
            onChange={(e) =>
              setProductEdited((prev) => ({
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
            value={productEdited.isPromoted ? "true" : "false"}
            onChange={(e) =>
              setProductEdited((prev) => ({
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


        {/* Date de création */}
        <div className="text-gray-400">
          <label className="block font-medium mb-1">Date de création</label>
          <input
            type="text"
            name="createdAt"
            value={productSelected?.createdAt.toDate().toLocaleDateString()}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-not-allowed"
            readOnly
          />
        </div>


        {/* Dernière modification */}
        <div className="text-gray-400">
          <label className="block  font-medium mb-1">Date de la dernière modification</label>
          <input
            type="text"
            name="lastUpdate"
            value={productSelected?.lastUpdate.toDate().toLocaleDateString()}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-not-allowed"
            readOnly
          />
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
          Modifier
        </button>
      </form>
      <div className="bg-gray-400">
        {productEdited?.imageSource ? (<img src={productEdited.imageSource} alt={"image-preview"} />) : (<div className="h-[300px] w-[300px] flex items-center justify-center border border-amber-300">Aucune Image</div>)}
      </div>
          <ToastContainer />
    </div>
  );
} 