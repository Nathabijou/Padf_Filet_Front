import React, { createContext, useContext } from 'react';

// Création du contexte pour stocker l'URL de base
const BaseUrlContext = createContext('');

// Component BaseUrlProvider pour fournir l'URL de base à toute l'application
export const BaseUrlProvider = ({ children }) => {
    // Définition de l'URL de base
    const baseUrl = 'http://localhost:8080';

    return (
        <BaseUrlContext.Provider value={baseUrl}>
            {children}
        </BaseUrlContext.Provider>
    );
};

// Hook useBaseUrl pour accéder à l'URL de base dans les composants
export const useBaseUrl = () => useContext(BaseUrlContext);
