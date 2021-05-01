import React, {createContext, useCallback, useContext, useRef, useState} from 'react';
import {SlotRef} from '../components/slot/Slot';
import {generateSymbols} from './helpers/slotGeneratorHelper';
import {ExtendedSlotSymbol} from './SlotSymbols';
import {getWinningSymbols} from './helpers/winResultCalculator';

export type SlotContextType = ReturnType<typeof useStore>;
// Create the context
export const SlotContext = createContext<SlotContextType>({} as any);

export interface SpinResult {
    symbol: ExtendedSlotSymbol,
    index: number
}

// Create the context provider
const useStore = (rowsAmount = 3, columnsAmount = 5) => {
    const slotRef = useRef<SlotRef>();
    const [moneyStake, setMoneyStake] = useState<number>(1.0);
    const [isSpinning, setSpinning] = useState<boolean>(false);
    const [isAutoSpinMode, setAutoSpinMode] = useState<boolean>(false);
    const [symbolsMap, setSymbolsMap] = useState<ExtendedSlotSymbol[][]>(generateSymbols(rowsAmount, columnsAmount));
    const [lastAmountOfProfit, setLastAmountOfProfit] = useState<number>();
    const [winningSymbols, setWinningSymbols] = useState<ExtendedSlotSymbol[][]>([]);

    const registerSlot = useCallback((slot: SlotRef) => {
        slotRef.current = slot;
    }, []);

    const spin = useCallback(async () => {
        setLastAmountOfProfit(undefined);

        const { current } = slotRef;
        if(current) {
            const generatedSlotSymbols = generateSymbols(rowsAmount, columnsAmount)
            setSymbolsMap(generatedSlotSymbols);

            setSpinning(true);
            // We have to pass the slot symbol inside spin(), because otherwise the state update happens to fast and the Slot it self
            // do not get the updated value, when the spin starts
            const visibleSlotSymbols = await current.spin(generatedSlotSymbols);
            setSpinning(false);

            setWinningSymbols(getWinningSymbols(visibleSlotSymbols, rowsAmount, columnsAmount));
        }
    }, [rowsAmount, columnsAmount]);

    return {
        winningSymbols,
        lastAmountOfProfit,
        moneyStake,
        setMoneyStake,
        isSpinning,
        setSpinning,
        isAutoSpinMode,
        setAutoSpinMode,
        symbolsMap,
        registerSlot,
        spin,
        rowsAmount,
        columnsAmount
    };
};

export interface SlotContextProviderProps {
    rows?: number;
    columns?: number
}

export const SlotContextProvider: React.FunctionComponent<SlotContextProviderProps> = ({ children, rows, columns }) => {
    const store = useStore(rows, columns);
    return (
        <SlotContext.Provider value={store}>
            {children}
        </SlotContext.Provider>
    );
}

// Create the hook to access the context
export const useSlotContext = () => useContext<SlotContextType>(SlotContext);
