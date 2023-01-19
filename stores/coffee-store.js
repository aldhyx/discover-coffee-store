import { createContext, useState } from 'react';

export const StoreContext = createContext();
export const StoreProvider = ({ children }) => {
    const [initialState, setInitialState] = useState({
        coffeeStores: [],
    });

    return (
        <StoreContext.Provider value={{ state: initialState, setInitialState }}>
            {children}
        </StoreContext.Provider>
    );
};
