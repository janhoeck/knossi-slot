import classNames from 'clsx';
import React, { forwardRef, HTMLAttributes, Ref, RefObject, useImperativeHandle, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { ExtendedSlotSymbol } from '../../tools/SlotSymbols';
import { SlotItem } from './SlotItem';
// @ts-ignore
import spinSound from '../../assets/spin-click-sound.mp3';

// noinspection JSSuspiciousNameCombination
const useStyles = createUseStyles(
    {
        root: ({ width, index }: SlotColumnProps) => ({
            width: width,
            left: index * width,
            transition: 'bottom 0.1s ease-in-out',
            bottom: 0,
        }),
        slotItem: ({ width }: SlotColumnProps) => ({
            width: width,
            height: width,
        }),
    },
    { name: 'SlotColumn' }
);

export interface SlotColumnProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    /**
     * Defines the width of a column
     */
    width: number;
    /**
     * The index of the column
     */
    index: number;
    slotSymbols: ExtendedSlotSymbol[];
    rowsAmount: number;
}

export interface SlotColumnRef {
    spin: (spinTime: number, slotSymbols: ExtendedSlotSymbol[]) => Promise<ExtendedSlotSymbol[]>;
    ref: RefObject<HTMLDivElement>;
}

const START_POSITION = 0;

/**
 * Returns the visible slot items of a column
 * @param symbols
 *  All symbols
 * @param symbolHeight
 *  The height in pixels of the symbol
 * @param position
 *  The position of the column on the y axis (negative value)
 * @param visibleSlotItemAmount
 *  The amount of visible slot items in a column
 */
const calculateVisibleSymbols = (
    symbols: ExtendedSlotSymbol[],
    symbolHeight: number,
    position: number,
    visibleSlotItemAmount: number
): ExtendedSlotSymbol[] => {
    // How often fits the symbolHeight into the position
    const offset = -position / symbolHeight;
    return Array.from({ length: visibleSlotItemAmount })
        .map((_, index) => {
            const symbolsIndex = symbols.length - offset - (index + 1);
            return symbols[symbolsIndex];
        })
        .reverse();
};

const audio = new Audio(spinSound);

export const SlotColumn = forwardRef((props: SlotColumnProps, ref: Ref<SlotColumnRef>) => {
    const { className, style, width, index, slotSymbols, rowsAmount, ...restProps } = props;
    const classes = useStyles({ ...props, width: width });

    const rootRef = useRef<HTMLDivElement>(null);

    const spin = (spinTime: number, slotSymbols: ExtendedSlotSymbol[]): Promise<ExtendedSlotSymbol[]> => {
        const { current } = rootRef;
        return new Promise<ExtendedSlotSymbol[]>((resolve) => {
            let internalPosition = START_POSITION;

            const intervalId = setInterval(() => {
                // Check if the limit of the column got reached. If yes, reset it to the start position
                if (internalPosition <= -(width * (slotSymbols.length - rowsAmount))) {
                    internalPosition = START_POSITION;
                }

                // remove the width (width equals height) from the current position.
                // Because of this, the animation will stop perfectly.
                internalPosition = internalPosition - width;

                if (current) {
                    // update the bottom style
                    current.style.bottom = `${internalPosition}px`;
                }
            }, 100);

            setTimeout(() => {
                // stop the spinning
                clearInterval(intervalId);

                // noinspection JSIgnoredPromiseFromCall
                audio.play();

                const spinResult = calculateVisibleSymbols(slotSymbols, width, internalPosition, rowsAmount);
                resolve(spinResult);
            }, spinTime);
        });
    };

    useImperativeHandle(ref, () => ({
        spin: spin,
        ref: rootRef,
    }));

    return (
        <div className={classNames(classes.root, className)} ref={rootRef} {...restProps}>
            {slotSymbols.map((slotSymbol, index) => (
                <SlotItem key={index} className={classes.slotItem} symbol={slotSymbol} />
            ))}
        </div>
    );
});

SlotColumn.displayName = 'SlotColumn';
