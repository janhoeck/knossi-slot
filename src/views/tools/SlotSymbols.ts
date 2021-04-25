import knossiImage from '../assets/slotImages/knossi.png';
import saschaImage from '../assets/slotImages/sascha.png';
import mannyMarcImage from '../assets/slotImages/mannymarc.png';
import sidoImage from '../assets/slotImages/sido.png';

export type SlotSymbolValue = 'KNOSSI' | 'SASCHA' | 'MANNY_MARC' | 'SIDO';

export interface SlotSymbol {
    value: SlotSymbolValue;
    /**
     * weight for this slotSymbol. Will be used to get a random item
     */
    weight: number;
    image?: string;
}

export interface ExtendedSlotSymbol extends SlotSymbol {
    row: number;
    column: number;
    highlight?: boolean;
}

export const SlotSymbols: SlotSymbol[] = [{
    value: 'KNOSSI',
    weight: 1,
    image: knossiImage
}, {
    value: 'SASCHA',
    weight: 1,
    image: saschaImage
}];

export const getRandomSymbol = (): SlotSymbol => {
    const weightedSlotSymbols = [];
    for (let slotSymbolIndex = 0; slotSymbolIndex < SlotSymbols.length; slotSymbolIndex++) {
        for (let weightIndex = 0; weightIndex < SlotSymbols[slotSymbolIndex].weight; weightIndex++){
            weightedSlotSymbols.push(slotSymbolIndex);
        }
    }

    const index = weightedSlotSymbols[Math.floor(Math.random() * weightedSlotSymbols.length)];
    return SlotSymbols[index];
};

export const getSymbol = (value: SlotSymbolValue): SlotSymbol =>  {
    return SlotSymbols.find((symbol) => symbol.value === value) as SlotSymbol;
};
