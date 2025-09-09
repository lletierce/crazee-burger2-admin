import { useEffect, useState } from 'react';
import PageLayout from '../layouts/PageLayout';
import Card from '../reusable-ui/card/Card';
import { collection, getDocs, limit, orderBy, query, startAfter, type DocumentData, type QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '../../api/firebase-config';
import { useNavigate } from 'react-router-dom';
import { SAMPLE_PRODUCTS } from '../../enums/product';
import { useApp } from '../../context/AppContext';


export default function ProductsPage() {

  // state
  const [products, setProducts] = useState<DocumentData[]>([]);
  // const [products, setProducts] = useState(SAMPLE_PRODUCTS);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
  const [loading, setLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);

  const navigate = useNavigate()

  const { setIsLateralLeftPanelOpen } = useApp();
  


  const fetchProducts = async (loadMore = false) => {
    setLoading(true);
    try {
      let q;

      if (loadMore && lastDoc) {
        q = query(
          collection(db, "products"),
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(20)
        );
      }
      else {
        q = query(
          collection(db, "products"),
          orderBy("createdAt", "desc"),
          limit(20)
        );
      }
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const newProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts((prev) => (loadMore ? [...prev, ...newProducts] : newProducts));

        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);


        if (snapshot.docs.length < 20) {
          setNoMore(true);
        }
      } else {
        setNoMore(true);
      }
    }
    catch (err) {
      console.error("Erreur de chargement Firestore :", err);
    }
    setLoading(false);
  }

  const handleProductSelected = async (idProductClicked: string) => {
    if (idProductClicked === undefined) {
      return;
    }
    navigate(`${idProductClicked}`)
  }

  const handleClickAddBtn = () => { 
    setIsLateralLeftPanelOpen(true)
    // console.log("handleClickAddBtn")
   }

  useEffect(() => {
    fetchProducts();
  }, []);



  // affichage
  return (
    <PageLayout>
      <div className="bg-yellow-400 h-[10vh] max-h-[60px] flex items-center flex-row-reverse pr-4">
        <button onClick={handleClickAddBtn} className='cursor-pointer'>+Ajouter</button>
      </div>

      {/* <div className="w-full p-4 flex flex-col gap-6 md:h-[85vh] md:pr-0 md:overflow-y-scroll md:overflow-hidden"> */}
      <div className="w-full p-4 flex flex-col gap-6 md:h-[81vh] md:pr-0 md:overflow-y-scroll overflow-hidden">
        {/* Grille responsive */}
        <div className="
          grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] 
          gap-6 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]
          md:gap-12
          justify-items-center"
        >
          {products.map((product) => (
            <div key={product.id}>
              {/* {product.productName  ?? "Sans nom"} */}
              <Card title={product.id} onClick={() => handleProductSelected(product.id)} />
            </div>
          ))}
        </div>

        {/* Bouton "Voir plus" */}
        {!noMore && (
          <div className="flex justify-center pt-6">
            <button
              onClick={() => fetchProducts(true)}
              disabled={loading}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Chargement..." : "Voir plus"}
            </button>
          </div>
        )}

        {/* Message si plus de données */}
        {noMore && (
          <p className="text-center text-gray-500">Tous les produits sont affichés</p>
        )}
      </div>
    </PageLayout>
  )
}