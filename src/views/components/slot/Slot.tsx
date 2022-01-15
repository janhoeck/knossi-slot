import classNames from 'clsx';
import React, { forwardRef, HTMLAttributes, Ref, RefObject, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme } from '../../../tools/Theme';
import { ExtendedSlotSymbol } from '../../tools/SlotSymbols';
import { SlotColumn, SlotColumnRef } from './SlotColumn';
import { WinIndicatorGrid } from '../winIndicatorGrind/WinIndicatorGrid';

const useStyles = createUseStyles<Theme>(
    {
        root: {
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            position: 'relative',
            overflow: 'hidden',
        },
        slotColumn: {
            position: 'absolute',
        },
        winIndicatorGrid: {
            position: 'absolute',
            zIndex: 1,
        },
    },
    { name: 'Slot' }
);

export interface SlotProps extends HTMLAttributes<HTMLDivElement> {
    rowsAmount: number;
    columnsAmount: number;
    symbolsMap: ExtendedSlotSymbol[][];
    winningSymbols: ExtendedSlotSymbol[][];
}

export interface SlotRef {
    spin: (slotSymbols: ExtendedSlotSymbol[][]) => Promise<ExtendedSlotSymbol[][]>;
    columnRefs: RefObject<SlotColumnRef[]>;
}

export const Slot = forwardRef((props: SlotProps, ref: Ref<SlotRef>) => {
    const { className, symbolsMap, rowsAmount, columnsAmount, winningSymbols, ...restProps } = props;
    const classes = useStyles(props);

    const [columnWidth, setColumnWidth] = useState<number>(0);
    const rootRef = useRef<HTMLDivElement>(null);
    const columnRefs = useRef<SlotColumnRef[]>([]);

    /**
     * Register a slot column reference for a specific index
     * @param index
     */
    const handleSlotColumnRef = (index: number) => {
        return (ref: SlotColumnRef) => {
            columnRefs.current[index] = ref;
        };
    };

    const spin = (slotSymbols: ExtendedSlotSymbol[][]): Promise<ExtendedSlotSymbol[][]> => {
        return new Promise<ExtendedSlotSymbol[][]>(async (resolve) => {
            if (columnWidth !== 0 && columnRefs.current.length !== 0) {
                const visibleSymbols = await Promise.all(
                    columnRefs.current.map((columnRef, index) => {
                        return columnRef.spin(500 + index * 500, slotSymbols[index]);
                    })
                );
                resolve(visibleSymbols);
            }
        });
    };

    useLayoutEffect(() => {
        const { current } = rootRef;
        if (current) {
            setColumnWidth(current.getBoundingClientRect().width / columnsAmount);
        }
    }, [rootRef, columnsAmount]);

    useImperativeHandle(ref, () => ({
        spin: spin,
        columnRefs: columnRefs,
    }));

    return (
        <div
            className={classNames(classes.root, className)}
            ref={rootRef}
            style={{
                height: columnWidth * rowsAmount,
            }}
            {...restProps}
        >
            {winningSymbols.map((winningSymbols, index) => (
                <WinIndicatorGrid
                    key={index}
                    className={classes.winIndicatorGrid}
                    columnAmount={columnsAmount}
                    rowAmount={rowsAmount}
                    winningSymbols={winningSymbols}
                />
            ))}
            {symbolsMap.map((slotSymbols, index) => (
                <SlotColumn
                    key={index}
                    ref={handleSlotColumnRef(index)}
                    className={classes.slotColumn}
                    index={index}
                    width={columnWidth}
                    rowsAmount={rowsAmount}
                    slotSymbols={slotSymbols}
                />
            ))}
        </div>
    );
});

Slot.displayName = 'Slot';
