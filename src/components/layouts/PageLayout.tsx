import React from 'react'

type PageLayoutProps = {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="bg-red-300 h-screen flex justify-center items-center">
      <div className="bg-red-600 flex flex-col h-full w-full md:h-[95vh] md:max-w-[1400px] md:mx-auto">
        <div className="bg-green-400 h-[8vh] px-3 md:h-[10vh] flex md:px-5">
          <p>navbar</p> {/*TODO: refacto w. <NavBar />*/}
          {/* <h1>Bienvenue, {userName}</h1> */}
          {/* <button onClick={logout}>
            Se déconnecter
          </button> */}
        </div>
        <div className="bg-blue-300 flex-1 relative">
          {/* <div className="bg-orange-300 absolute top-0 left-0 h-full">
                        left lateral panel
                </div> */}
          {children}
          {/* <button onClick={addProduct}>Ajouter un produit</button> */}
        </div>
      </div>
    </div>
  );
}