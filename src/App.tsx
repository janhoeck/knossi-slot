import React from 'react';
import { ThemeProvider } from 'react-jss';
import { AccountContextProvider } from './tools/context/AccountContext';
import { theme } from './tools/Theme';
import { SlotView } from './views/SlotView';
import { SlotContextProvider } from './views/tools/SlotContext';
import { IconContext } from 'react-icons';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <AccountContextProvider>
                <IconContext.Provider value={{size: '2em'}}>
                    <SlotContextProvider>
                        <SlotView/>
                    </SlotContextProvider>
                </IconContext.Provider>
            </AccountContextProvider>
        </ThemeProvider>
    );
};

export default App;
