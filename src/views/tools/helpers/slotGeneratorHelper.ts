import {ExtendedSlotSymbol, getRandomSymbol} from '../SlotSymbols';

export const generateSymbols = (rows: number, columns: number): ExtendedSlotSymbol[][] => {
    const slotSymbols: ExtendedSlotSymbol[][] = [];
    // We have to add +5 here, because this will be faked rows which won't be displayed to the user
    // But we need this for the scroll effect
    for(let rowIndex = 0; rowIndex < (rows + 5); rowIndex++) {
        for(let columnIndex = 0; columnIndex < columns; columnIndex++) {
            if(!Array.isArray(slotSymbols[columnIndex])) {
                slotSymbols[columnIndex] = [];
            }

            const slotSymbol = getRandomSymbol();
            slotSymbols[columnIndex][rowIndex] = {...slotSymbol, row: rowIndex, column: columnIndex};
        }
    }

    return slotSymbols;
};
