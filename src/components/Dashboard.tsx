import { logout } from "../api/authService";
import { addProduct, getProduct } from "../api/menuService";
import { useAuth } from "../context/AuthContext";
import { getUsernameFromEmail } from "../utils/string";

export default function Dashboard() {
    const { user } = useAuth();
    const userName = getUsernameFromEmail(user?.email)

    // appel API pour récupérer le produit "81dQsvr9XA0bfJvQjPu0" => Burger Smoke BBQ"
    // getProduct("81dQsvr9XA0bfJvQjPu0")

    return (
        <div>
            <h1>Bienvenue, {userName}</h1>
            <button onClick={logout}>
                Se déconnecter
            </button> <br />
            <button onClick={addProduct}>Ajouter un produit</button>
        </div>
    )
}