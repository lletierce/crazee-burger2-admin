import { BsPersonCircle } from 'react-icons/bs'
import { MdMenu } from 'react-icons/md'
import LogoText from '../logo/LogoText'

export default function Navbar() {
    return (
        <nav>
            <div className='flex md:hidden bg-red-500 h-[8vh] min-h-[64px] w-full fixed top-0 z-10'>NavbarMobile</div>
            <div className='hidden md:flex bg-blue-500 h-[10vh] px-6'>NavbarDesktop</div>
        </nav>
    )
}


/*
<nav className='relative'>
            <div className="bg-yellow-400 md:hidden h-[8vh] min-h-[64px] w-full flex flex-row items-center justify-between fixed top-0 right-0 left-0 z-50">
                <div className="pl-3 flex items-center h-full text-3xl">
                    <MdMenu />
                </div>
                <div className='flex items-center h-full'>
                    <img src="/images/logo-orange.png" alt="logo-crazee-burger"
                        className='object-contain object-center h-3/4'
                    />
                </div>
                <div className="pr-3 flex items-center h-full  text-3xl">
                    <BsPersonCircle />
                </div>
            </div>
            
            <div className='hidden md:flex bg-amber-400 h-[10vh] px-6'>
                <div className='bg-green-600 flex h-full w-3/4'>
                    <div className=' flex items-center h-full pr-6 cursor-pointer'><LogoText /></div>
                    <div className='  flex flex-row h-full items-center gap-x-6 '>
                        <div className='text-base font-mono cursor-pointer hover:text-red-700 hover:underline hover:underline-offset-8'>Produits</div>
                        <div>Utilisateurs</div>
                        <div>Coupons</div>
                    </div>
                </div>
                <div className='bg-red-400 flex justify-end items-center w-1/4'>profile</div>
            </div>
        </nav>
*/