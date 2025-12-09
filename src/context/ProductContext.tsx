import { createContext, useContext, useState } from "react";
import { EMPTY_PRODUCT, type ProductType } from "../enums/product"
import type { DocumentData } from "firebase/firestore";

// --- Type du contexte ---
type ProductContextType = {
    // productSelected: ProductType;
    //setProductSelected: React.Dispatch<React.SetStateAction<(ProductType)>>
    idProductSelected: string;
    setIdProductSelected: React.Dispatch<React.SetStateAction<string>>
}

// --- Création du contexte (non initialisé) ---
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// --- Provider global ---
export function ProductProvider ({ children }: { children: React.ReactNode }) {
      
    const [idProductSelected, setIdProductSelected] = useState<string>("");

    return <ProductContext.Provider value={{idProductSelected, setIdProductSelected}}>
        {children}
    </ProductContext.Provider>
}

// --- Hook personnalisé pour accéder au contexte ---
export function useProduct() {
    const context = useContext(ProductContext)
    
    if (!context) {
        throw new Error("useProduct doit être utilisé à l'intérieur de ProductProvider");
    }
  
    return context;
}
