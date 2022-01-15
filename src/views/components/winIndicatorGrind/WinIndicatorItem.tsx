import React, { HTMLAttributes, memo, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme } from '../../../tools/Theme';
import classNames from 'clsx';
import { ExtendedSlotSymbol } from '../../tools/SlotSymbols';

const useStyles = createUseStyles<Theme>(
    (theme) => ({
        root: {
            width: '100%',
            height: '100%',
        },
        canvas: {
            width: '100%',
            height: '100%',
        },
    }),
    { name: 'WinIndicatorItem' }
);

export interface WinIndicatorItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    className?: string;
    beforeWinningSymbol?: ExtendedSlotSymbol;
    winningSymbol?: ExtendedSlotSymbol;
    nextWinningSymbol?: ExtendedSlotSymbol;
}

export const WinIndicatorItem = memo((props: WinIndicatorItemProps) => {
    const { className, beforeWinningSymbol, winningSymbol, nextWinningSymbol, ...restProps } = props;
    const classes = useStyles(props);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const { current } = canvasRef;
        if (!current) {
            return;
        }

        // It is possible, that this item has no win to display. We have to check it
        if (!winningSymbol) {
            return;
        }

        const canvasContext = current.getContext('2d');
        if (!canvasContext) {
            return;
        }

        const beforeRowIndex = beforeWinningSymbol?.rowIndex;
        const rowIndex = winningSymbol.rowIndex;
        const nextRowIndex = nextWinningSymbol?.rowIndex;

        const { height, width } = current.getBoundingClientRect();
        const xCenter = width / 2;
        const yCenter = height / 2;

        console.log('height', height, 'width', width, 'xCenter', xCenter, 'yCenter', yCenter);

        if ((!beforeRowIndex && rowIndex === nextRowIndex) || (!nextRowIndex && beforeRowIndex === rowIndex)) {
            canvasContext.beginPath();
            canvasContext.lineWidth = 10;
            canvasContext.moveTo(0, yCenter);
            console.log('moveTo', 0, yCenter);
            canvasContext.lineTo(width, yCenter);
            console.log('lineTo', width, yCenter);
            canvasContext.stroke();
            return;
        }
    }, [canvasRef, beforeWinningSymbol, winningSymbol, nextWinningSymbol]);

    return (
        <div className={classNames(classes.root, className)} {...restProps}>
            <canvas className={classes.canvas} ref={canvasRef} />
        </div>
    );
});

WinIndicatorItem.displayName = 'WinIndicatorItem';
