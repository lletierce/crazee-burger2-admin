import { useNavigate, useParams } from "react-router-dom"
import PageLayout from "../layouts/PageLayout"
import { useEffect, useState } from "react";
import { IMAGE_NOT_AVAILABLE, type ProductType } from "../../enums/product";
import ImagePreview from "../reusable-ui/ImagePreview";
import { deleteProduct, getProductBySlug } from "../../api/menuService";
import ConfirmDialog from "../reusable-ui/ConfirmDialog";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_OPTIONS, DELETE_PRODUCT_FAIL_MESSAGE, DELETE_PRODUCT_SUCCESS_MESSAGE } from "../../enums/toast";
import EditProductForm from "../EditProductForm";


export default function ProductPage() {

  const [productSelected, setProductSelected] = useState<ProductType | null>(null);
  const [isEditable, setIsEditable] = useState(false)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  // const { idProductSelected } = useProduct();
  const { slug } = useParams(); // params.slug

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);


  const handleClickOnProducts = () => {
    navigate(`../`)
  }

  const handleDelete = async (id: string) => {
    try {
      deleteProduct(id)
      toast.success(DELETE_PRODUCT_SUCCESS_MESSAGE, DEFAULT_TOAST_OPTIONS)
      navigate(`../`)
    }
    catch (error) {
      toast.error(DELETE_PRODUCT_FAIL_MESSAGE, DEFAULT_TOAST_OPTIONS)
    }
  }


  const handleEdit = () => {
    // setIsEditable(!isEditable)
    console.log(isEditable)
  }

  const fetchProduct = async () => {

    setLoading(true);

    if (slug) {
      try {
        const data = await getProductBySlug(slug);

        if (data !== null) {
          setProductSelected(data)
        }
      }
      catch (err) {
        // console.error("Erreur de chargement Firestore :", err);
        toast.error("GET_PRODUCT_FAIL_MESSAGE", DEFAULT_TOAST_OPTIONS)
      }
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchProduct();
  }, []);

  if (!productSelected) return <p>Chargement...</p>;
  
  if (loading) return <p>Chargement...</p>;


  return (
    <PageLayout>
      <div className="bg-purple-400 h-full md:h-[85vh] md:px-4">
        <div className="bg-yellow-400 h-[10vh] max-h-[60px] flex items-center justify-between px-4">
          {/* <span>{"Produits > Boissons > "} {productSelected.productName}</span> */}
          <ul className="flex list-none gap-2">
            <li><span className="cursor-pointer hover:underline" onClick={handleClickOnProducts}>Produits</span></li>
            <li>{"> "}<span className="capitalize">{productSelected.productType}</span></li>
            <li>{"> "}<span className="capitalize">{productSelected.productName}</span></li>
          </ul>
          <div className="flex gap-x-4">
            <button
              className="cursor-pointer hover:bg-blue-900"
              onClick={handleEdit}
            >
              {isEditable ? "Annuler" : "Modifier"}
            </button>
            <button
              className="cursor-pointer hover:bg-red-900"
              onClick={() => {
                setSelectedProductId(selectedProductId);
                setIsDialogOpen(true);
              }}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="bg-green-700 flex flex-1 flex-col-reverse md:flex-row overflow-hidden">
          <div className="bg-orange-400 flex-1">
            {isEditable ? <EditProductForm /> :
              <>
                <h2>{productSelected.productName}</h2>
                <p>prix: {productSelected.price}</p>
                <p>quantité: {productSelected.quantity}</p>
                <p>imageSource: {productSelected.imageSource}</p>
                <p>isAvailable: {productSelected.isAvailable ? "oui" : "non"}</p>
                <p>isPromoted: {productSelected.isPromoted ? "oui" : "non"}</p>
                <p>productType: {productSelected.productType}</p>

                <p>createdAt: {productSelected.createdAt.toDate().toLocaleDateString()}</p>
                <p>lastUpdate: {productSelected.createdAt.toDate().toLocaleDateString()}</p>
                <ImagePreview
                  imageURL={productSelected.imageSource ? productSelected.imageSource : IMAGE_NOT_AVAILABLE}
                />
              </>
            }
          </div>

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