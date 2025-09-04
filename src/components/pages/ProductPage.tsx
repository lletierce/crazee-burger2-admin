import { useNavigate, useParams } from "react-router-dom"
import PageLayout from "../layouts/PageLayout"
import { useEffect, useState } from "react";
import type { DocumentData } from "firebase/firestore";
import { findDocById } from "../../api/menuService";
import { EMPTY_PRODUCT, SAMPLE_PRODUCTS } from "../../enums/product";


export default function ProductPage() {

  const [product, setProduct] = useState<DocumentData>(SAMPLE_PRODUCTS[0])
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  // const params  = useParams();
  const { productId } = useParams(); // params.productId


  const debug = async () => {
    if (productId === undefined) { return; }
    // const pdt = await findDocById("products", productId)
    // console.log("pdt: ", pdt);
    console.log(product)
  }

  useEffect(() => {
    debug()
  }, [])


  return (
    <PageLayout>
      <div className="bg-purple-400 md:h-[85vh] h-full px-4">
        <div className="bg-yellow-400 h-[5vh] min-h-[60px] flex items-center">toolbar</div>
        <div className="bg-blue-700 md:h-[80vh] flex flex-col md:flex-row">
          <div className="bg-orange-400 flex-1/2">description</div>
          <div className="bg-yellow-700 flex-1/2">image</div>
        </div>
      </div>
    </PageLayout>
  )
}

/*
<h2>Ceci est : {productId}</h2>
<h3>{product.productName}</h3>
<button className="cursor-pointer" onClick={() => navigate(`../`)}>return</button>
*/