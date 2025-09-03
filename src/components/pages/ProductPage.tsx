import { useNavigate, useParams } from "react-router-dom"
import PageLayout from "../layouts/PageLayout"
import { useEffect, useState } from "react";
import type { DocumentData } from "firebase/firestore";
import { findDocById } from "../../api/menuService";
import { EMPTY_PRODUCT } from "../../enums/product";


export default function ProductPage() {

  const [product, setProduct] = useState<DocumentData>(EMPTY_PRODUCT)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  // const params  = useParams();
  const { productId } = useParams(); // params.productId


  const debug = async () => {
    if (productId === undefined) { return; }
    const pdt = await findDocById("products", productId)
    console.log("pdt: ", pdt);
  }

  useEffect(() => {
    // debug()
  }, [])


  return (
    <PageLayout>
      <div className="bg-purple-400 h-full md:mx-6 md:h-[85vh] mt-5">
        <div className="bg-blue-500 md:h-[5vh] h-[60px] flex items-center">toolbar</div>
        <div className="bg-blue-700 md:h-[80vh] h-100">
          <div>description</div>
          <div>image</div>
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