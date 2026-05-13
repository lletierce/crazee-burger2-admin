import { useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout'

export default function ResetPasswordSuccessPage() {

    const navigate = useNavigate();

    const handleMoveToLogin = () => {
        navigate("/login")
    }

    

    return (
        <AuthLayout
            title="Bravo !"
            logoVariant="success"
        >
            <div className="flex flex-col gap-4">
                <p>Votre mot de passe a été changé.</p>
                <button
                    className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                    onClick={handleMoveToLogin}>
                    Connexion
                </button>
            </div>
        </AuthLayout>
    )
}
