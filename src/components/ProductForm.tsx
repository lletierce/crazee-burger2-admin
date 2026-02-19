import { Timestamp } from "firebase/firestore";
import type { ProductType } from "../enums/product";
import { useEffect, useState } from "react";

type ProductFormProps = {
    productSelected: ProductType;
};

export type ProductToDisplayType = {
    productName: string;
    imageSource: string;
    productType: string;
    price: number;
    quantity: number;
    isAvailable: boolean;
    isPromoted: boolean;
    createdAt: Timestamp;
    lastUpdate: Timestamp;
}

export const INIT_PRODUCT_TO_DISPLAY = Object.freeze({
    productName: "",
    imageSource: "",
    productType: "",
    price: 0,
    quantity: 0,
    isAvailable: false,
    isPromoted: false,
    createdAt: Timestamp.fromDate(new Date("2000-01-01T00:00:00Z")),
    lastUpdate: Timestamp.fromDate(new Date("2000-01-01T00:00:00Z")),
})

// 946684800000

export default function ProductForm({ productSelected }: ProductFormProps) {

    const [productToDisplay, setProductToDisplay] = useState<ProductToDisplayType>(INIT_PRODUCT_TO_DISPLAY)

    useEffect(() => {
        setProductToDisplay(productSelected)
        console.log(productSelected);
    }, [])

    return (
        <div className="bg-gray-50 flex items-center justify-center px-4 py-10 w-full md:max-h-[80vh] ">
            <form className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg flex flex-col gap-6">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                    🍔 {productToDisplay.productName}
                </h2>

                {/* Nom du produit */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Nom du produit</label>
                    <input
                        type="text"
                        name="productName"
                        defaultValue={productToDisplay ? productToDisplay.productName : ""}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-default"
                        readOnly
                    />
                </div>

                {/* URL de l'image */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Image (URL)</label>
                    <input
                        type="url"
                        name="imageSource"
                        defaultValue={productToDisplay ? productToDisplay.imageSource : ""}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-default"
                        readOnly
                    />
                </div>

                {/* Catégorie | productType */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Catégorie</label>
                    <input
                        type="text"
                        name="productType"
                        defaultValue={productToDisplay ? productToDisplay.productType : ""}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-default"
                        readOnly
                    />
                </div>

                {/* Prix */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Prix (€)</label>
                    <input
                        type="number"
                        name="price"
                        value={productToDisplay ? productToDisplay.price : 0}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-default"
                        readOnly
                    />
                </div>


                {/* Quantité */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Quantité</label>
                    <input
                        type="number"
                        name="quantity"
                        value={productToDisplay ? productToDisplay.quantity : 0}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-default"
                        readOnly
                    />
                </div>

                {/* Disponibilité */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Disponibilité</label>
                    <input
                        type="text"
                        name="isAvailable"
                        value={productToDisplay.isAvailable ? "Disponible" : "Non disponible"}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-default"
                        readOnly
                    />
                </div>

                {/* Promouvoir */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Promouvoir</label>
                    <input
                        type="text"
                        name="isPromoted"
                        value={productToDisplay.isPromoted ? "Avec publicité" : "Sans publicité"}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-default"
                        readOnly
                    />
                </div>


                {/* Dernière modification (en readonly) */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Date de la dernière modification</label>
                    <input
                        type="text"
                        name="lastUpdate"
                        defaultValue={productSelected?.lastUpdate.toDate().toLocaleDateString()}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-default"
                        readOnly
                    />
                </div>

                {/* Date de création (en readonly) */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Date de création</label>
                    <input
                        type="text"
                        name="createdAt"
                        defaultValue={productSelected?.createdAt.toDate().toLocaleDateString()}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-default"
                        readOnly
                    />
                </div>
            </form>
            <div className="h-full">
                <div className="bg-gray-400">
                    {productSelected?.imageSource ? (<img src={productSelected.imageSource} alt={"image-preview"} />) : (<div className="h-[400px] w-[400px] flex items-center justify-center border border-amber-300">Aucune Image</div>)}
                </div>
            </div>
        </div>
    )
}
