import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authService";
import { LOGIN_FAILURE_MESSAGE } from "../enums/auth";

export default function AuthForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email != import.meta.env.VITE_EMAIL_ADM) {
      setError(LOGIN_FAILURE_MESSAGE)
      return
    }

    try {
      await login(email, password);
      setError('');
      navigate('/produits'); // redirection
    } catch (err: any) {
      // setError(err.message);
      setError(LOGIN_FAILURE_MESSAGE);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Mot de passe" />
      {error && <p>{error}</p>}
      <button type="submit">Se connecter</button>
    </form>
  )
}