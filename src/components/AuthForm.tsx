import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api/authService";

export default function AuthForm() {
   const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
      setError('');
      navigate('/dashboard'); // redirection
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Mot de passe" />
      {error && <p>{error}</p>}
      <button type="submit">
        {isLogin ? 'Se connecter' : 'S’inscrire'}
      </button>
      <p
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Créer un compte" : "Déjà un compte ? Se connecter"}
      </p>
    </form>
  )
}