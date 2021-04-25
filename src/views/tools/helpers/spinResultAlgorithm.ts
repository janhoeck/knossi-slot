import {ExtendedSlotSymbol} from '../SlotSymbols';

/**
 * Groups all slot symbols by the row index
 */
const groupSlotSymbolsByRow = (slotSymbols: ExtendedSlotSymbol[][]): ExtendedSlotSymbol[][] => {
    const slotSymbolsGroupedByRow: ExtendedSlotSymbol[][] = [];
    slotSymbols.forEach((slotSymbols) => {
        slotSymbols.forEach((slotSymbol) => {
            if (!Array.isArray(slotSymbolsGroupedByRow[slotSymbol.row])) {
                slotSymbolsGroupedByRow[slotSymbol.row] = [];
            }

            slotSymbolsGroupedByRow[slotSymbol.row].push(slotSymbol);
        });
    });
    return slotSymbolsGroupedByRow;
}

/**
 * Check how much slot symbols are the same of a row in a row
 */
const getEqualityCountPerRow = (slotSymbols: ExtendedSlotSymbol[]): number => {
    let equalityCount = 1;

    for (let index = 0; index < slotSymbols.length; index++) {
        const slotSymbol = slotSymbols[index];
        const previousSlotSymbol = slotSymbols[index - 1];
        if (previousSlotSymbol) {
            if (previousSlotSymbol.value === slotSymbol.value) {
                equalityCount++;
            } else {
                break;
            }
        }
    }

    return equalityCount;
}

export interface WinResult {
    row: number,
    symbols: ExtendedSlotSymbol[]
}

export const checkWin = (visibleSlotSymbols: ExtendedSlotSymbol[][]): WinResult[] => {
    const slotSymbolsGroupedByRow = groupSlotSymbolsByRow(visibleSlotSymbols);
    return slotSymbolsGroupedByRow.map((slotSymbolsByRow, index) => {
        const equalityCount = getEqualityCountPerRow(slotSymbolsByRow);
        if (equalityCount >= 3) {
            return {
                row: index,
                symbols: slotSymbolsByRow
            };
        }
        return undefined;
    }).filter(Boolean) as WinResult[];
}
