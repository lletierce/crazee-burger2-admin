import { createContext, useContext, useState, type ReactNode } from "react";

type EditingContextType = {
    isEditing: boolean;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    startEditing: () => void;
    stopEditing: () => void;
}

// Création du context
export const EditingContext = createContext<EditingContextType | null>(null);

// Provider
export function EditingProvider({ children }: { children: ReactNode }) {
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = () => setIsEditing(true);
  const stopEditing = () => setIsEditing(false);

  return (
    <EditingContext.Provider value={{ isEditing, setIsEditing, startEditing, stopEditing }}>
      {children}
    </EditingContext.Provider>
  );
}

// Hook personnalisé pour accéder au contexte
export function useEditing() {
  const context = useContext(EditingContext);

  if (!context) {
    throw new Error("useEditing must be used within an EditingProvider");
  }

  return context;
}