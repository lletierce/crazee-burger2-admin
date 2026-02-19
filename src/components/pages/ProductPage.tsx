import { useNavigate, useParams } from "react-router-dom"
import PageLayout from "../layouts/PageLayout"
import { useEffect, useState, type FormEvent } from "react";
import { deleteProduct, getProductBySlug } from "../../api/menuService";
import ConfirmDialog from "../reusable-ui/ConfirmDialog";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_OPTIONS, DELETE_PRODUCT_FAIL_MESSAGE, DELETE_PRODUCT_SUCCESS_MESSAGE } from "../../enums/toast";
import EditProductForm from "../EditProductForm";
import ProductForm from "../ProductForm";
import type { ProductType } from "../../enums/product";

export type ProductEditingType = {
  productName: string;
  price: number;
  imageSource: string;
  quantity: number;
  isAvailable: boolean;
  isPromoted: boolean;
  productType: string;
}

const EMPTY_PRODUCT_EDITING = Object.freeze({
  productName: "",
  price: 0,
  imageSource: "",
  quantity: 0,
  isAvailable: false,
  isPromoted: false,
  productType: "",
})


export default function ProductPage() {

  const [productSelected, setProductSelected] = useState<ProductType | null>(null);
  const [productEditing, setProductEditing] = useState<ProductEditingType>(EMPTY_PRODUCT_EDITING);


  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate()
  const { slug } = useParams(); // params.slug


  // [Produits] > ProductCategory > ProductName
  const handleClickOnProducts = () => {
    navigate(`../`)
  }

  const handleDelete = async (id: string) => {
    try {
      deleteProduct(id)
      toast.success(DELETE_PRODUCT_SUCCESS_MESSAGE, DEFAULT_TOAST_OPTIONS)
      navigate(`../`) // TODO : replace w. static path(from enum) to avoid unpredictable redirection
    }
    catch (error) {
      toast.error(DELETE_PRODUCT_FAIL_MESSAGE, DEFAULT_TOAST_OPTIONS)
    }
  }


  const handleEdit = () => {
    setIsEditing(!isEditing)
    //console.log(isEditing)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setProductEditing((prev) => ({
      ...prev,
      [name]: value,
    }));
    //console.log({[name]: value})
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("handlesubmit")
  }

  const fetchProduct = async () => {

    setLoading(true);

    if (slug) {
      try {
        const data = await getProductBySlug(slug);

        if (data !== null) {
          setProductSelected(data)
          {/* TODO: REFACTO !!! */}
          setProductEditing({
            productName: data.productName,
            price: data.price,
            imageSource: data.imageSource,
            quantity: data.quantity,
            isAvailable: data.isAvailable,
            isPromoted: data.isPromoted,
            productType: data.productType,
          })
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
              {isEditing ? "Annuler" : "Modifier"}
            </button>
            <button
              className="cursor-pointer hover:bg-red-900"
              onClick={() => {
                setIsDialogOpen(true);
              }}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="bg-green-700 flex flex-1 flex-col-reverse md:flex-row overflow-hidden">
          { isEditing ? <EditProductForm /> : <ProductForm productSelected={productSelected} />}
        </div>
      </div>
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => productSelected && handleDelete(productSelected.id)}
        message="Êtes-vous sûr de vouloir supprimer ce produit ?"
      />
    </PageLayout>
  )
}



/*
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
*/


