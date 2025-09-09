import { useNavigate, useParams } from "react-router-dom"
import PageLayout from "../layouts/PageLayout"
import { useEffect, useState } from "react";
import type { DocumentData, Timestamp } from "firebase/firestore";
import { EMPTY_PRODUCT, IMAGE_NOT_AVAILABLE, SAMPLE_PRODUCTS } from "../../enums/product";
import ImagePreview from "../reusable-ui/ImagePreview";
import { findDocById } from "../../api/menuService";
import AddProductForm from "../AddProductForm";


type Product = {
  productName: string,
  price: number,
  imageSource: string,
  quantity: number,
  isAvailable: boolean,
  isPromoted: boolean,
  createdAt: Timestamp,
  lastUpdate: Timestamp,
  productType: string,
}

export default function ProductPage() {

  // const [product, setProduct] = useState<DocumentData>(SAMPLE_PRODUCTS[0])
  const [product, setProduct] = useState<(Product & { id: string }) | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  // const params  = useParams();
  const { productId } = useParams(); // params.productId

  const handleClickOnProducts = () => {
    navigate(`../`)
    //console.log("handleClickOnProducts")
   }


  useEffect(() => {
    if (!productId) { return; }

    const fetchProduct = async () => {
      const data = await findDocById<Product>("products", productId);
      setProduct(data);
    };

    fetchProduct();
    // console.log(product)
  }, [productId]);

  if (!product) return <p>Chargement...</p>;

  return (
    <PageLayout>
      <div className="bg-purple-400 h-full md:h-[85vh] md:px-4">
        <div className="bg-yellow-400 h-[10vh] max-h-[60px] flex items-center">
          {/* <span>{"Produits > Boissons > "} {product.productName}</span> */}
          <ul className="flex list-none gap-2">
            <li><span className="cursor-pointer" onClick={handleClickOnProducts}>Produits</span></li>
            <li>{"> "}<span>{product.productType}</span></li>
            <li>{"> "}<span>{product.productName}</span></li>
          </ul>

        </div>
        <div className="bg-green-700 flex flex-1 flex-col-reverse md:flex-row overflow-hidden">
          <div className="bg-orange-400 flex-1">
            <h2>{product.productName}</h2>
            <p>prix: {product.price}</p>
            <p>quantité: {product.quantity}</p>
            <p>imageSource: {product.imageSource}</p>
            <p>isAvailable: {product.isAvailable ? "oui" : "non"}</p>
            <p>isPromoted: {product.isPromoted ? "oui" : "non"}</p>
            <p>productType: {product.productType}</p>
            
            <p>createdAt: {product.createdAt.toDate().toLocaleDateString()}</p>
            <p>lastUpdate: {product.createdAt.toDate().toLocaleDateString()}</p>
          </div>
          <ImagePreview
            imageURL={product.imageSource ? product.imageSource : IMAGE_NOT_AVAILABLE}
          />
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