import { logout } from "../api/authService";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
    const { user } = useAuth();

    return (
        <div>
            <h1>Bienvenue, {user?.email}</h1>
            <button onClick={logout}>
                Se déconnecter
            </button>
        </div>
    )
}