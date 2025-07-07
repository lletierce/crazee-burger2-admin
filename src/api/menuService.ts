import { doc, getDoc } from "firebase/firestore"
import { db } from "./firebase-config"

export const getProduct = async (idProduct: string) => { 
    // const docRef = doc(PATH) => db\products\81dQsvr9X..
    const docRef = doc(db, "products", idProduct )
    const docSnapshot = await getDoc(docRef)

    if (docSnapshot.exists()) {
        const productReceived = docSnapshot.data()
        console.log("productReceived: ", productReceived)
    }
 }