import { logout } from "../api/authService";
import { useAuth } from "../context/AuthContext";
import { getUsernameFromEmail } from "../utils/string";

export default function Dashboard() {
    const { user } = useAuth();
    const userName = getUsernameFromEmail(user?.email)


    return (
        <div>
            <h1>Bienvenue, {userName}</h1>
            <button onClick={logout}>
                Se déconnecter
            </button>
        </div>
    )
}