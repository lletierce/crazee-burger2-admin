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
    if(productId === undefined) {return;}
    const pdt = await findDocById("products", productId)
    console.log("pdt: ", pdt);
  }

  useEffect(() => {
    debug()
  }, [])


  return (
    <PageLayout>
      <div>
        <h2>Ceci est : {productId}</h2>
        <h3>{product.productName}</h3>
        <button className="cursor-pointer" onClick={() => navigate(`../`)}>return</button>
      </div>
    </PageLayout>
  )
}