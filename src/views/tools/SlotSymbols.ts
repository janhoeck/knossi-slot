const knossiImage = require('../assets/slotImages/knossi.png');
const saschaImage = require('../assets/slotImages/sascha.png');
const mannyMarcImage = require('../assets/slotImages/mannymarc.png');
const sidoImage = require('../assets/slotImages/sido.png');

export type SlotSymbolValue = 'KNOSSI' | 'SASCHA' | 'MANNY_MARC' | 'SIDO';

export interface SlotSymbol {
    value: SlotSymbolValue;
    /**
     * weight for this slotSymbol. Will be used to get a random item
     */
    weight: number;
    image?: string;
}

export const SlotSymbols: SlotSymbol[] = [{
    value: 'KNOSSI',
    weight: 1,
    image: knossiImage
}, {
    value: 'SASCHA',
    weight: 1,
    image: saschaImage
}, {
    value: 'MANNY_MARC',
    weight: 1,
    image: mannyMarcImage
}, {
    value: 'SIDO',
    weight: 1,
    image: sidoImage
}];

export const getRandomSymbol = (): SlotSymbol => {
    const weightedSlotSymbols = [];
    for (let slotSymbolIndex = 0; slotSymbolIndex < SlotSymbols.length; slotSymbolIndex++) {
        for (let weightIndex = 0; weightIndex < SlotSymbols[slotSymbolIndex].weight; weightIndex++){
            weightedSlotSymbols.push(slotSymbolIndex);
        }
    }
    return SlotSymbols[weightedSlotSymbols[Math.floor(Math.random() * weightedSlotSymbols.length)]];
};

export const getSymbol = (value: SlotSymbolValue): SlotSymbol =>  {
    return SlotSymbols.find((symbol) => symbol.value === value) as SlotSymbol;
};
