import { BiSolidCheckCircle } from "react-icons/bi";
import { BiSolidErrorCircle } from "react-icons/bi";

type LogoProps = {
    variant?: "default" | "success" | "error" | "skeleton";
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
                <BiSolidCheckCircle className="object-contain object-center text-8xl"  />
            </div>
        )
    }

    if (variant == "error") {
        return (
            <div className="text-[#e25549] flex justify-center items-center text-center">
                <BiSolidErrorCircle className="object-fit object-center text-8xl" />
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