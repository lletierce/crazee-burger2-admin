import React, { createContext, useContext, useState } from "react";

type AppContextType = {
    isLateralLeftPanelOpen: boolean;
    setIsLateralLeftPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType>({
    isLateralLeftPanelOpen: false,
    setIsLateralLeftPanelOpen: function (value: React.SetStateAction<boolean>): void {
        throw new Error("Function not implemented.");
    }
}, );
// const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    
    const [isLateralLeftPanelOpen, setIsLateralLeftPanelOpen] = useState(false)

    
    return <AppContext.Provider value={{isLateralLeftPanelOpen, setIsLateralLeftPanelOpen }}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)