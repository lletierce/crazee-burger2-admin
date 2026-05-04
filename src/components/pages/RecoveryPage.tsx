import { useState } from 'react';
import AuthLayout from '../layouts/AuthLayout'
import { LOGIN_FAILURE_MESSAGE } from '../../enums/auth';
import { resetPassword } from '../../api/authService';
import { useNavigate } from 'react-router-dom';

export default function RecoveryPage() {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
    
    
            try {
                await resetPassword(email);
                setError('');
                navigate('/recovery-send'); // redirection
            } catch (err: any) {
                setError(LOGIN_FAILURE_MESSAGE);
                console.log("error - recovery")
            }
        };

    const handleReturnPage = () => { 
        navigate("/login")
     }


    return (
        <AuthLayout title="Récupération du mot de passe">
            <button onClick={handleReturnPage}>{"Retour"}</button>
            <div>Vous allez recevoir un e-mail vous permetant de modifier votre mot de passe.</div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        {error && <p className="text-red-600">{error}</p>}
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Email"
                            maxLength={30}
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                            type="submit">
                            Envoyer
                        </button>
                    </form>
        </AuthLayout>
    )
}