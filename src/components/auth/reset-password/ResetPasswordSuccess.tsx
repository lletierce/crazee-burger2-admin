import { useNavigate } from "react-router-dom";

export default function ResetPasswordSuccess() {

      const navigate = useNavigate();

      const moveToLoginPage = () => {
        navigate("/login")
    }

    return (
        <div className="flex flex-col gap-4">
            <p>Votre changement de mot de passe a bien été enregistré.</p>
            <p>Vous pouvez dès à présent vous connecter pour accéder à l'application crazee-burger-adm.</p>
            <button
                className="bg-blue-600 text-white py-3 mt-6 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                onClick={moveToLoginPage}>
                Se connecter
            </button>
        </div>
    )
}
