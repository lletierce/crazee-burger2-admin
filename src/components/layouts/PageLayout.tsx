import React, { useState } from 'react'

import Navbar from '../reusable-ui/navbar/Navbar';
import LateralLeftPanel from '../reusable-ui/LateralLeftPanel';
import { useApp } from '../../context/AppContext';

type PageLayoutProps = {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {

  const { isLateralLeftPanelOpen } = useApp();

  return (
    <div className="bg-red-300 h-screen flex justify-center items-center">
      <div className="bg-green-600 flex flex-col h-full w-full md:h-[95vh] md:max-w-[1400px] md:mx-auto">
        <Navbar />
        <div className="bg-blue-300 flex-1 relative pt-[8vh] md:pt-0">
          {isLateralLeftPanelOpen && <LateralLeftPanel/>}
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