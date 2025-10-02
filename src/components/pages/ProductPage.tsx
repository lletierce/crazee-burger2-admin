import { useNavigate, useParams } from "react-router-dom"
import PageLayout from "../layouts/PageLayout"
import { useEffect, useState } from "react";
import { type Timestamp } from "firebase/firestore";
import { IMAGE_NOT_AVAILABLE, type ProductType } from "../../enums/product";
import ImagePreview from "../reusable-ui/ImagePreview";
import { deleteProduct, findDocById } from "../../api/menuService";
import ConfirmDialog from "../reusable-ui/ConfirmDialog";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_OPTIONS, DELETE_PRODUCT_FAIL_MESSAGE, DELETE_PRODUCT_SUCCESS_MESSAGE } from "../../enums/toast";


export default function ProductPage() {

  // const [product, setProduct] = useState<DocumentData>(SAMPLE_PRODUCTS[0])
  const [product, setProduct] = useState<(ProductType & { id: string }) | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  // const params  = useParams();
  const { productId } = useParams(); // params.productId

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);


  const handleClickOnProducts = () => {
    navigate(`../`)
    //console.log("handleClickOnProducts")
  }

  const handleDelete = async (id: string) => {
    try {
      deleteProduct(id)
      toast.success(DELETE_PRODUCT_SUCCESS_MESSAGE, DEFAULT_TOAST_OPTIONS)
      navigate(`../`)
    }
    catch (error) {
      toast.error(DELETE_PRODUCT_FAIL_MESSAGE, DEFAULT_TOAST_OPTIONS)
      //console.error("Erreur lors de la suppression :", error);
    }
  }


  useEffect(() => {
    if (!productId) { return; }

    const fetchProduct = async () => {
      const data = await findDocById<ProductType>("products", productId);
      setProduct(data);
    };

    fetchProduct();
    // console.log(product)
  }, [productId]);

  if (!product) return <p>Chargement...</p>;

  return (
    <PageLayout>
      <div className="bg-purple-400 h-full md:h-[85vh] md:px-4">
        <div className="bg-yellow-400 h-[10vh] max-h-[60px] flex items-center justify-between px-4">
          {/* <span>{"Produits > Boissons > "} {product.productName}</span> */}
          <ul className="flex list-none gap-2">
            <li><span className="cursor-pointer hover:underline" onClick={handleClickOnProducts}>Produits</span></li>
            <li>{"> "}<span>{product.productType}</span></li>
            <li>{"> "}<span>{product.productName}</span></li>
          </ul>
          <button
            className="cursor-pointer hover:bg-red-900"
            onClick={() => {
              setSelectedProductId(product.id);
              setIsDialogOpen(true);
            }}
          >
            Delete
          </button>
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
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => selectedProductId && handleDelete(selectedProductId)}
        message="Êtes-vous sûr de vouloir supprimer ce produit ?"
      />
    </PageLayout>
  )
}

/*
<h2>Ceci est : {productId}</h2>
<h3>{product.productName}</h3>
<button className="cursor-pointer" onClick={() => navigate(`../`)}>return</button>
*/