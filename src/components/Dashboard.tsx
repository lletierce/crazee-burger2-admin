import { logout } from "../api/authService";
import { addProduct, getProduct } from "../api/menuService";
import { useAuth } from "../context/AuthContext";
import { getUsernameFromEmail } from "../utils/string";
import PageLayout from "./layouts/PageLayout";

export default function Dashboard() {
    const { user } = useAuth();
    const userName = getUsernameFromEmail(user?.email)

    // appel API pour récupérer le produit "81dQsvr9XA0bfJvQjPu0" => Burger Smoke BBQ"
    // getProduct("81dQsvr9XA0bfJvQjPu0")

    return (
        <PageLayout>
            <p>container - Dashboard</p>
        </PageLayout>
    )
}