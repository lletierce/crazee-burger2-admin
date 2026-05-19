import { useState } from "react";
import { LOGIN_FAILURE_MESSAGE } from "../../../enums/auth";

type ResetPasswordFormProps = {
    handlerResetPassword: (password: string) => Promise<void>
}

export default function ResetPasswordForm({handlerResetPassword} : ResetPasswordFormProps) {
  
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');

    
    const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
    
            try {
                await handlerResetPassword(password);
                setError('');
            } catch (err: any) {
                setError(LOGIN_FAILURE_MESSAGE);
                console.log("error - reset in form")
            }
        };
    
  
    return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div>Indiquez le nouveau mot de passe que vous souhaitez utiliser pour votre compte.</div>

        {/* TODO: add checking same password*/}
        {error && <p className="text-red-600">{error}</p>}
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
  )
}
