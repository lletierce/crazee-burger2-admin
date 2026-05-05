import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

export default function RecoverySendPage() {
  const navigate = useNavigate();

  const handleMoveToLogin = () => {
    navigate("/login")
  }

  return (
    <AuthLayout 
      title="Récupération envoyée!" 
      labelActionBtn='Retour' 
      onClickActionBtn={handleMoveToLogin}
      logoVariant="success"
      >
      <div className="flex flex-col gap-4">
        <p>Votre demande de réinitialisation de mot de passe a bien été enregistrée.</p>
        <p>Si votre e-mail correspond à un compte enregistré sur crazee-burger-app-adm, vous recevrez un message à cette adresse.</p>
      </div>
    </AuthLayout>
  )
}
