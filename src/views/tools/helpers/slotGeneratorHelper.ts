import { getRandomSymbol, SlotSymbol } from '../SlotSymbols';

export const generateSymbols = (rows: number, columns: number): SlotSymbol[][] => {
    const slotSymbols: SlotSymbol[][] = [];
    // We have to add +5 here, because this will be faked rows which won't be displayed to the user
    // But we need this for the scroll effect
    for(let rowsIndex = 0; rowsIndex < (rows + 5); rowsIndex++) {
        for(let columnsIndex = 0; columnsIndex < columns; columnsIndex++) {
            if(!Array.isArray(slotSymbols[columnsIndex])) {
                slotSymbols[columnsIndex] = [];
            }
            slotSymbols[columnsIndex][rowsIndex] = getRandomSymbol();
        }
    }
    return slotSymbols;
};
