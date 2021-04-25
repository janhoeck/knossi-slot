import React, {createContext, useContext, useState} from 'react';

export type AccountContextType = ReturnType<typeof useStore>;
// Create the context
const AccountContext = createContext<AccountContextType>({} as any);

// Create the context provider
const useStore = (initialMoney = 0.0) => {
    const [money, setMoney] = useState<number>(initialMoney);

    const increaseMoney = (amount: number) => setMoney((money) => money + amount);
    const decreaseMoney = (amount: number) => setMoney((money) => money - amount);

    return {
        money,
        setMoney,
        increaseMoney,
        decreaseMoney
    }
};

export interface SlotContextProviderProps {
    initialMoney?: number;
}

export const AccountContextProvider: React.FunctionComponent<SlotContextProviderProps> = ({ children, initialMoney }) => {
    const store = useStore(initialMoney);
    return (
        <AccountContext.Provider value={store}>
            {children}
        </AccountContext.Provider>
    );
}

// Create the hook to access the context
export const useAccountContext = () => useContext<AccountContextType>(AccountContext);
