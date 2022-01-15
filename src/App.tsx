import React from 'react';
import { ThemeProvider } from 'react-jss';
import { AccountContextProvider } from './tools/context/AccountContext';
import { theme } from './tools/Theme';
import { SlotView } from './views/SlotView';
import { IconContext } from 'react-icons';

const IconContextValue = {
    size: '2em',
};

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <AccountContextProvider initialMoney={10}>
                <IconContext.Provider value={IconContextValue}>
                    <SlotView />
                </IconContext.Provider>
            </AccountContextProvider>
        </ThemeProvider>
    );
};

export default App;
