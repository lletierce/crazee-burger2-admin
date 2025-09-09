import { collection, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "./firebase-config"



export const getProduct = async (idProduct: string) => {
    // docRef = doc(PATH) => db\products\81dQsvr9X..
    const docRef = doc(db, "products", idProduct)
    const docSnapshot = await getDoc(docRef)

    if (docSnapshot.exists()) {
        const productReceived = docSnapshot.data()
        //console.log("productReceived: ", productReceived)
        return productReceived
    }
}

export const addProduct = async () => {

    // PATH
    const newDocRef = doc(collection(db, "products"));

    // DATA
    const data = {
        imageSource: "https://crazee-burger-seven.vercel.app/images/logo-orange.png",
        productName: "produit",
        price: 5.90,
        quantity: 100,
        isAvailable: true,
        isPromoted: false,
        productType: "Burger",
        createdAt: serverTimestamp(),
        lastUpdate: serverTimestamp(),
    }

    try {
        // SetDoc(PATH, DATA)
        await setDoc(newDocRef, data)
        // console.log("Produit ajouté avec ID :", newDocRef.id);

    }
    catch (err: any) {
        console.log("error: ", err)
    }
}

// export const findDocById = async (collectionName: string, docId: string) => {
//     const docRef = doc(db, collectionName, docId);
//     const docSnap = await getDoc(docRef);

//     if (!docSnap.exists()) {
//         console.log("Aucun document trouvé avec cet ID");
//         return null;
//     }

//     return { id: docSnap.id, ...docSnap.data() };
// }

export const findDocById = async <T = any>(
  collectionName: string,
  docId: string
): Promise<(T & { id: string }) | null> => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    console.log("Aucun document trouvé");
    return null;
  }

  return { id: docSnap.id, ...docSnap.data() } as T & { id: string };
};