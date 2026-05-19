import { useNavigate } from "react-router-dom";

export default function ResetPasswordError() {

  const navigate = useNavigate();

    const moveToRecoveryPage = () => {
        navigate("/recovery")
    }

  return (
    <div className="flex flex-col gap-4">
            <p>Une erreur c'est produite lors du changement de votre mot passe.</p>
            <p>Si le problème persiste, nous vous recommendons de contacter l'équipe technique.</p>
            <button
                className="bg-blue-600 text-white py-3 mt-6 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                onClick={moveToRecoveryPage}>
                Réessayer
            </button>
        </div>
  )
}
