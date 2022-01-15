import classNames from 'clsx';
import React, { HTMLAttributes } from 'react';
import { createUseStyles, WithStylesProps } from 'react-jss';
import { SlotActionBar } from './components/actionBar/SlotActionBar';
import { Slot } from './components/slot/Slot';
import { useSlotContext } from './tools/SlotContext';

import { Theme } from '../tools/Theme';
import { AmountOfProfitDisplay } from './components/AmountOfProfitDisplay';

const useStyles = createUseStyles<Theme>(
    (theme) => ({
        root: {
            height: '100%',
            width: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.primary.dark,
            overflow: 'hidden',
        },
        slotContainer: {
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: theme.spacing * 2,
        },
        slot: {
            width: '90%',
            maxWidth: 1000,
        },
        actionBar: {},
    }),
    { name: 'SlotViewContent' }
);

export interface SlotViewContentProps extends HTMLAttributes<HTMLDivElement>, Partial<WithStylesProps<typeof useStyles>> {}

export const SlotViewContent = (props: SlotViewContentProps) => {
    const { className, ...restProps } = props;
    const classes = useStyles();
    const { registerSlot, symbolsMap, rowsAmount, columnsAmount, lastAmountOfProfit, winningSymbols } = useSlotContext();

    return (
        <div className={classNames(classes.root, className)} {...restProps}>
            <div className={classes.slotContainer}>
                {lastAmountOfProfit && <AmountOfProfitDisplay amount={lastAmountOfProfit} />}
                <Slot
                    className={classes.slot}
                    ref={registerSlot}
                    symbolsMap={symbolsMap}
                    winningSymbols={winningSymbols}
                    rowsAmount={rowsAmount}
                    columnsAmount={columnsAmount}
                />
            </div>
            <SlotActionBar className={classes.actionBar} />
        </div>
    );
};

SlotViewContent.displayName = 'SlotViewContent';
