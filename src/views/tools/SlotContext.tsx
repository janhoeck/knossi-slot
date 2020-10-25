import React, { createContext, PropsWithChildren, useCallback, useContext, useRef, useState } from 'react';
import { SlotRef } from '../components/slot/Slot';
import { generateSymbols } from './helpers/slotGeneratorHelper';
import { SlotSymbol } from './SlotSymbols';

// Create the context
const SlotContext = createContext({} as any);

export interface SlotContextProviderProps {
    rows?: number;
    columns?: number
}

export interface SpinResult {
    symbol: SlotSymbol,
    index: number
}

// Create the context provider
const SlotContextProvider = (props: PropsWithChildren<SlotContextProviderProps>) => {
    const {children, rows = 3, columns = 5} = props;

    const slotRef = useRef<SlotRef>();
    const [moneyStake, setMoneyStake] = useState<number>(1.0);
    const [isSpinning, setSpinning] = useState<boolean>(false);
    const [isAutoSpinMode, setAutoSpinMode] = useState<boolean>(false);
    const [symbolsMap, setSymbolsMap] = useState<SlotSymbol[][]>(generateSymbols(rows, columns));

    const registerSlot = useCallback((slot: SlotRef) => {
        slotRef.current = slot;
    }, []);

    const spin = useCallback(async () => {
        const { current } = slotRef;
        if(current) {
            setSymbolsMap(generateSymbols(rows, columns));

            setSpinning(true);
            const spinResult = await current.spin();
            console.log(spinResult);
            setSpinning(false);
        }
    }, [slotRef, rows, columns]);

    return (
        <SlotContext.Provider
            value={{
                moneyStake: moneyStake,
                setMoneyStake: setMoneyStake,
                isSpinning: isSpinning,
                setSpinning: setSpinning,
                isAutoSpinMode: isAutoSpinMode,
                setAutoSpinMode: setAutoSpinMode,
                symbolsMap: symbolsMap,
                registerSlot: registerSlot,
                spin: spin,
                rows: rows,
                columns: columns
            }}
        >
            {children}
        </SlotContext.Provider>
    );
};

// Create the hook to access the context
const useSlotContext = () => useContext(SlotContext);

// export everything
export { SlotContext, SlotContextProvider, createContext, useSlotContext };
