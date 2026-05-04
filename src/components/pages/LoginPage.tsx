import AuthLayout from '../layouts/AuthLayout'
import LoginForm from '../LoginForm'

export default function LoginPage() {
    return (
        <AuthLayout title="Connectez-vous à votre compte crazee-burger">
            <LoginForm />
        </AuthLayout>
    )
}