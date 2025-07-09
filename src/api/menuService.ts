import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "./firebase-config"



export const getProduct = async (idProduct: string) => {
    // docRef = doc(PATH) => db\products\81dQsvr9X..
    const docRef = doc(db, "products", idProduct)
    const docSnapshot = await getDoc(docRef)

    if (docSnapshot.exists()) {
        const productReceived = docSnapshot.data()
        console.log("productReceived: ", productReceived)
    }
}

export const addProduct = async () => {

    // PATH
    const newDocRef = doc(collection(db, "products"));

    // DATA
    const data = {
        productName: "Nouveau produit",
        price: 5.90,
        quantity: -100,
    }

    try {
        // SetDoc(PATH, DATA)
        await setDoc(newDocRef, data)
        console.log("Produit ajouté avec ID :", newDocRef.id);

    }
    catch (err: any) {
        console.log("error: ", err)
    }
}