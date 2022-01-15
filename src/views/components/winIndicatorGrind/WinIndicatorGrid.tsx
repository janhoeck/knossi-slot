import React, { HTMLAttributes, memo } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme } from '../../../tools/Theme';
import classNames from 'clsx';
import { ExtendedSlotSymbol } from '../../tools/SlotSymbols';
import { WinIndicatorItem } from './WinIndicatorItem';

const useStyles = createUseStyles<Theme>(
    (theme) => ({
        root: {
            width: '100%',
            height: '100%',
            display: 'flex',
        },
        column: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
        },
        item: {
            flex: 1,
        },
    }),
    { name: 'WinIndicatorGrid' }
);

export interface WinIndicatorGridProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    className?: string;
    columnAmount: number;
    rowAmount: number;
    winningSymbols: ExtendedSlotSymbol[];
}

export const WinIndicatorGrid = memo((props: WinIndicatorGridProps) => {
    const { className, columnAmount, rowAmount, winningSymbols, ...restProps } = props;
    const classes = useStyles(props);

    const getWinningSymbolIndex = (columnIndex: number, rowIndex: number): number => {
        return winningSymbols.findIndex((symbol) => symbol.rowIndex === rowIndex && symbol.columnIndex === columnIndex);
    };

    return (
        <div className={classNames(classes.root, className)} {...restProps}>
            {Array.from(Array(columnAmount).keys()).map((_, columnIndex) => (
                <div key={columnIndex} className={classes.column}>
                    {Array.from(Array(rowAmount).keys()).map((_, rowIndex) => {
                        const winningSymbolIndex = getWinningSymbolIndex(columnIndex, rowIndex);

                        return (
                            <WinIndicatorItem
                                key={rowIndex}
                                className={classes.item}
                                beforeWinningSymbol={winningSymbols[winningSymbolIndex - 1]}
                                winningSymbol={winningSymbols[winningSymbolIndex]}
                                nextWinningSymbol={winningSymbols[winningSymbolIndex + 1]}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
});

WinIndicatorGrid.displayName = 'WinIndicatorGrid';
