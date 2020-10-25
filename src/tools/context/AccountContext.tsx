import React, { createContext, PropsWithChildren, useContext, useState } from 'react';

// Create the context
const AccountContext = createContext({} as any);

// Create the context provider
const AccountContextProvider = (props: PropsWithChildren<unknown>) =>{
    const { children } = props;
    const [money, setMoney] = useState<number>(0.0);

    return (
        <AccountContext.Provider value={{ money: money, setMoney: setMoney }}>
            {children}
        </AccountContext.Provider>
    );
};

// Create the hook to access the context
const useAccountContext = () => useContext(AccountContext);

// export everything
export { AccountContext, AccountContextProvider, createContext, useAccountContext };
