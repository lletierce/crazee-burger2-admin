import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { confirmReset } from '../../api/authService';

export default function ResetPasswordPage () {

    const [password, setPassword] = useState("");
    const [params] = useSearchParams();
    const oobCode = params.get("oobCode");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!oobCode) return;

    await confirmReset(oobCode, password);
    // alert("Mot de passe mis à jour !");
    console.log("Mot de passe mis à jour ! -> "+{oobCode})
    navigate("/login")
  };


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        maxLength={30}
        placeholder="Nouveau mot de passe"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Valider</button>
    </form>
  )
}
