import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, query, setDoc, Timestamp, where, type DocumentData } from "firebase/firestore"
import { db } from "./firebase-config"
import type { ProductToAddType, ProductType } from "../enums/product";

export const deleteProduct = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
    // additional instructions possible here if needed
}

// export const getProduct = async (idProduct: string) => {
//     // docRef = doc(PATH) => db\products\81dQsvr9X..
//     const docRef = doc(db, "products", idProduct)
//     const docSnapshot = await getDoc(docRef)

//     if (docSnapshot.exists()) {
//         const productReceived = docSnapshot.data()
//         //console.log("productReceived: ", productReceived)
//         return productReceived
//     }
// }

export const getProductBySlug = async (slug: string): Promise<ProductType | null> => {
  const productsRef = collection(db, "products");    
  
  const q = query(productsRef, where("slug", "==", slug));
  const snapshot = await getDocs(q);

   if (snapshot.empty) {
    console.log(`Aucun produit trouvé pour le slug : ${slug}`);
    return null;
  }

  const doc = snapshot.docs[0];
  return mapFirestoreProduct({ id: doc.id, ...doc.data() });
}


export const addProduct = async (productToAdd: ProductToAddType) => {
  await addDoc(collection(db, "products"), productToAdd);
}

export const updateProduct = async ( idProduct: string, data: Partial<DocumentData>): Promise<void> => {  
  
  const docRef = doc(db, "products", idProduct);
  
  try {
    await setDoc(docRef, data, { merge: true });
    // console.log("Produit mis à jour (via setDoc + merge) !");
  } catch (error) {
    // console.error("Erreur lors de la mise à jour du produit :", error);
    throw error;
  }
};

export const doesProductExistBySlug  = async (slug: string): Promise<boolean> => {
  if (!slug) return false;

    const productsRef = collection(db, "products");
    
    const q = query(
    productsRef,
    where("slug", "==", slug),
    limit(1) // optimisation : on s'arrête au premier match
  );

    const snapshot = await getDocs(q);
  
  return !snapshot.empty;
}


// export const findDocById = async <T = any>(
//   collectionName: string,
//   docId: string
// ): Promise<(T & { id: string }) | null> => {
//   const docRef = doc(db, collectionName, docId);
//   const docSnap = await getDoc(docRef);

//   if (!docSnap.exists()) {
//     console.log("Aucun document trouvé");
//     return null;
//   }

//   return { id: docSnap.id, ...docSnap.data() } as T & { id: string };
// };


export const mapFirestoreProduct = (doc: any): ProductType => {
  return {
    id: doc.id,
    productName: doc.productName,
    price: doc.price,
    imageSource: doc.imageSource,
    quantity: doc.quantity,
    isAvailable: doc.isAvailable,
    isPromoted: doc.isPromoted,
    createdAt: doc.createdAt instanceof Timestamp ? doc.createdAt : null,
    lastUpdate: doc.lastUpdate instanceof Timestamp ? doc.lastUpdate : null,
    productType: doc.productType,
    slug: doc.slug,
  };
};