import {ExtendedSlotSymbol} from '../SlotSymbols';

const iterate = (visibleSlotSymbols: ExtendedSlotSymbol[][], callback: (columnIndex: number, rowIndex: number) => void) => {
    for (let columnIndex = 0; columnIndex < visibleSlotSymbols.length; columnIndex++) {
        const columnItem = visibleSlotSymbols[columnIndex];
        for (let rowIndex = 0; rowIndex < columnItem.length; rowIndex++) {
            callback(columnIndex, rowIndex);
        }
    }
}

/**
 * Checks if all symbols are from the same type
 * @param symbols
 */
const checkWin = (symbols: ExtendedSlotSymbol[]): boolean => {
    const firstSymbolValue = symbols[0].value;
    return symbols.every((symbol) => symbol.value === firstSymbolValue);
}

export const getWinningSymbols = (visibleSlotSymbols: ExtendedSlotSymbol[][], rowsAmount: number, columnAmount: number): ExtendedSlotSymbol[][] => {
    const winningSymbols: ExtendedSlotSymbol[][] = [];

    /**
     * Check each row of the slot. Example:
     * X X X X X
     * - - - - -
     * X X X X X
     */
    for(let rowIndex = 0; rowIndex < rowsAmount; rowIndex ++) {
        const symbols: ExtendedSlotSymbol[] = [];
        iterate(visibleSlotSymbols, (columnIndex , _rowIndex) => {
            if(rowIndex === _rowIndex) {
                symbols.push(visibleSlotSymbols[columnIndex][_rowIndex]);
            }
        });

        const isWin = checkWin(symbols);
        if(isWin) {
            winningSymbols.push(symbols);
        }
    }

    /**
     * Check the V of the slot. Example:
     * \ X X X /
     * X \ X / X
     * X X - X X
     */
    const symbols: ExtendedSlotSymbol[] = [];
    iterate(visibleSlotSymbols, (columnIndex, rowIndex) => {
        const symbol = visibleSlotSymbols[columnIndex][rowIndex];
        if (columnIndex === rowIndex) {
            symbols.push(symbol);
            return;
        }

        if (rowIndex === rowsAmount - 1) {
            return;
        }

        if (columnAmount / 2 <= columnIndex && (columnIndex - rowIndex) % 2 === 0) {
            symbols.push(symbol);
        }
    });

    const isWin = checkWin(symbols);
    if(isWin) {
        winningSymbols.push(symbols);
    }

    console.log('winningSymbols', winningSymbols);
    return winningSymbols;
}
