import React from 'react'

type AuthLayoutProps = {
    children: React.ReactNode;
    title?: string;
};

export default function AuthLayout({ children, title = 'Connexion' }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">{title}</h1>
                {children}
            </div>
        </div>
    )
}