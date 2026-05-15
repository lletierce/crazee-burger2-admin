import React from "react";
import MinimalistActionBtn from "../reusable-ui/button/MinimalistActionBtn";
import Logo from "../reusable-ui/logo/Logo";


type AuthLayoutProps = {
    children: React.ReactNode;
    title?: string;
    titleVariant?: "default" | "skeleton";
    labelActionBtn?: string;
    onClickActionBtn?: () => void;
    logoVariant?: "default" | "success" | "error" | "skeleton";


};

export default function AuthLayout({
    children,
    title = 'Connexion',
    titleVariant = "default",
    labelActionBtn = '',
    onClickActionBtn,
    logoVariant = "default",

}: AuthLayoutProps) {

    const renderTitle = () => {
        switch (titleVariant) {
            case "skeleton":
                return (
                    <div className="my-6 h-12 w-full rounded bg-gray-200 animate-pulse" />
                );

            case "default":
            default:
                return (
                    <h1 className="my-6 text-center font-amatic text-4xl font-bold text-gray-800">
                        {title}
                    </h1>
                );
        }
    };

    return (
        <div className="
            min-h-screen 
            flex 
            justify-center 
            bg-[#f5f5f7]
            md:bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url('/images/Burger-and-fries-background.jpg')]
            bg-cover 
            bg-center
        ">
            <div className="
                w-full
                max-w-md
                bg-[#f5f5f7]
                p-8
                shadow-xl
                md:mt-36
                md:h-min
                md:rounded-2xl  
            ">
                {/* Bouton optionnel */}
                {labelActionBtn && <MinimalistActionBtn label={labelActionBtn} onClick={onClickActionBtn} />}
                
                {/* Logo */}
                <Logo variant={logoVariant} />
                
                {/* Titre */}
                {renderTitle()}
                
                {/* Contenu de la page */}
                {children}
            </div>
        </div>
    )
}