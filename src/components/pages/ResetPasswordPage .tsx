import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { confirmReset } from '../../api/authService';
import AuthLayout from '../layouts/AuthLayout';

export default function ResetPasswordPage() {

  const [password, setPassword] = useState("");
  const [params] = useSearchParams();
  const oobCode = params.get("oobCode");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!oobCode) return;

    await confirmReset(oobCode, password);
    console.log("Mot de passe mis à jour ! -> " + { oobCode })
    navigate("/login")
  };


  return (
    <AuthLayout title="Changement de mot de passe">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div>Indiquez le nouveau mot de passe que vous souhaitez utiliser pour votre compte.</div>

        {/* {error && <p className="text-red-600">{error}</p>} TODO: add checking same password*/}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Nouveau mot de passe"
          minLength={5}
          maxLength={30}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          type="submit">
          Valider
        </button>
      </form>
    </AuthLayout>
  )
}


/*
<form onSubmit={handleSubmit}>
      <input
        type="password"
        maxLength={30}
        placeholder="Nouveau mot de passe"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Valider</button>
    </form>
*/