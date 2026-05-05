import React from "react";
import MinimalistActionBtn from "../reusable-ui/button/MinimalistActionBtn";
import Logo from "../reusable-ui/logo/Logo";


type AuthLayoutProps = {
    children: React.ReactNode;
    title?: string;
    labelActionBtn? : string;
    onClickActionBtn?: () => void;
    logoVariant?: "default" | "success";


};

export default function AuthLayout({ 
    children, 
    title = 'Connexion', 
    labelActionBtn = '', 
    onClickActionBtn,
    logoVariant = "default",
    
}: AuthLayoutProps) {
    
        return (
        <div className="min-h-screen flex justify-center bg-[#f5f5f7]
            md:bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url('/images/Burger-and-fries-background.jpg')]
            bg-cover bg-center
        "> {/* bg-gray-100 md:items-center */}
            <div className="w-full md:h-min max-w-md bg-[#f5f5f7] shadow-xl md:rounded-2xl p-8 md:mt-36">
                {labelActionBtn && <MinimalistActionBtn label={labelActionBtn} onClick={onClickActionBtn} />}
                <Logo variant={logoVariant}/>
                <h1 className="text-4xl font-amatic font-bold text-center text-gray-800 my-6"
                >
                    {title}
                </h1>
                {children}
            </div>
        </div>
    )
}

// Files in the public directory are served at the root path.