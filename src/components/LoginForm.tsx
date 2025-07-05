import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LOGIN_FAILURE_MESSAGE } from '../enums/auth';
import { login } from '../api/authService';
import IconWrapper from './IconWrapper';
import { FaApple, FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaSquareXTwitter } from 'react-icons/fa6';

export default function LoginForm() {
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
            navigate('/dashboard'); // redirection
        } catch (err: any) {
            // setError(err.message);
            setError(LOGIN_FAILURE_MESSAGE);
        }
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {error && <p className="text-red-600">{error}</p>}
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Mot de passe"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                type="submit">
                Connexion
            </button>
            <p className='cursor-pointer text-sm'>Mot de passe oublié ?</p>
            <hr />
            <p className="text-gray-500 text-xs  flex justify-center">Plus d'options de connexion</p>

            <div className="flex justify-center gap-6 md:gap-10 bg-white dark:bg-gray-100 shadow-lg rounded-2xl px-6 py-4">
                <IconWrapper icon={<FcGoogle />} />
                <IconWrapper icon={<FaApple />} color="text-black" />
                <IconWrapper icon={<FaFacebook />} color="text-blue-600" />
                <IconWrapper icon={<FaSquareXTwitter />} color="text-black" />
            </div>
        </form>
    );
}