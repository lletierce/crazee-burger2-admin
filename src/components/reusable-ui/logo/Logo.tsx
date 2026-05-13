import { FaCircleCheck } from "react-icons/fa6";

type LogoProps = {
    variant?: "default" | "success" | "skeleton";
}

export default function Logo({ variant = "default" }: LogoProps) {
    if (variant == "default") {
        return (
            <div className='flex justify-center items-center text-center pt-4'>
                <img
                    src="../../../../public/images/logo-orange.png"
                    alt="logo"
                    className="object-contain object-center h-[80px] md:h-[100px]"
                    onLoad={() => console.log("Image chargée")}
                />
            </div>
        )
    }

    if (variant == "success") {
        return (
            <div className="text-[#60bd4f] flex justify-center items-center text-center">
                <FaCircleCheck className="object-contain object-center text-8xl" />
            </div>
        )
    }

    if (variant == "skeleton") {
        return (
            <div className="flex justify-center items-center text-center">
                <div className="object-center h-24 w-32 rounded-4xl bg-gray-200" />
            </div>
        )
    }
}