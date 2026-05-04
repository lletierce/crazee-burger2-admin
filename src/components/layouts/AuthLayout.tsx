import React from 'react'

type AuthLayoutProps = {
    children: React.ReactNode;
    title?: string;
};

export default function AuthLayout({ children, title = 'Connexion' }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex justify-center  bg-gray-100"> {/* bg-gray-100 md:items-center */}
            <div className="w-full md:h-min max-w-md bg-white-400 shadow-xl md:rounded-2xl p-8 md:mt-36">
                <div className='flex justify-center items-center text-center'>
                    <img src="../../../public/images/logo-orange.png" className="object-contain object-center h-[80px] md:h-[100px]"/>
                </div>
                <h1 className="text-2xl font-bold text-center text-gray-800 my-6">{title}</h1>
                {children}
            </div>
        </div>
    )
}