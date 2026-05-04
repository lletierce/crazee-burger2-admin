import { useNavigate } from "react-router-dom";

export default function RecoverySendPage() {
  const navigate = useNavigate();

  const handleMoveToLogin = () => { 
    navigate("/login")
   }

  return (
    <div>
        <h3> Vous allez recevoir un e-mail. </h3>
        <p>Merci, nous avons bien enregistré votre demande de réinitialisation de mot de passe. Si l'e-mail que vous nous avez communiqué correspond à un compte enregistré sur crazee-burger-app-adm, vous recevrez un message à cette adresse</p>
        <button onClick={handleMoveToLogin}>Se connecter</button>
    </div>
  )
}
