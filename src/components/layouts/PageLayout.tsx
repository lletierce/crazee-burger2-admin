import React from 'react'

import Navbar from '../reusable-ui/navbar/Navbar';

type PageLayoutProps = {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {


  return (
    <div className="bg-red-300 h-screen flex justify-center items-center">
      <div className="bg-green-600 flex flex-col h-full w-full md:h-[95vh] md:max-w-[1400px] md:mx-auto">
        <Navbar />
        <div className="bg-blue-300 flex-1 relative pt-[10vh] md:pt-0">
          {/* <div className="bg-orange-300 absolute top-0 left-0 h-full">
                        left lateral panel
                </div> */}
          {children}
        </div>
      </div>
    </div>
  );
}


{/*TODO: refacto w. <NavBar />*/}
          {/* <h1>Bienvenue, {userName}</h1> */}
          {/* <button onClick={logout}>
            Se déconnecter
          </button> */}