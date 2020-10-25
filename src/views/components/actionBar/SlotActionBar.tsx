import classNames from 'clsx';
import React, { HTMLAttributes, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme } from '../../../tools/Theme';
import { useSlotContext } from '../../tools/SlotContext';
import { MoneyStakeAction } from './MoneyStakeAction';
import { SpinAction } from './SpinAction';

const useStyles = createUseStyles<Theme>((theme) => ({
    root: {
        width: '100%',
        background: theme.palette.primary.main,
        position: 'relative',
        padding: theme.spacing,
        display: 'flex',
        height: 60,
    },
    autoSpinAction: {},
    spinAction: {
        position: 'absolute',
        left: '50%',
        bottom: 25,
    },
}), {name: 'SlotActionBar'});

export interface SlotActionBarProps extends HTMLAttributes<HTMLDivElement> {

}

export const SlotActionBar = (props: SlotActionBarProps) => {
    const {className, ...restProps} = props;
    const classes = useStyles(props);
    const {spin, isSpinning, moneyStake, setMoneyStake} = useSlotContext();

    const increaseMoneyStake = useCallback(() => {
        setMoneyStake(moneyStake + 1);
    }, [moneyStake, setMoneyStake]);

    const decreaseMoneyStake = useCallback(() => {
        if (moneyStake > 1) {
            setMoneyStake(moneyStake - 1);
        }
    }, [moneyStake, setMoneyStake]);

    return (
        <div className={classNames(classes.root, className)} {...restProps}>
            <MoneyStakeAction
                moneyStake={moneyStake}
                increase={increaseMoneyStake}
                decrease={decreaseMoneyStake}
                decreaseDisabled={moneyStake <= 1 || isSpinning}
                increaseDisabled={isSpinning}
            />
            <SpinAction
                className={classes.spinAction}
                disabled={isSpinning}
                onClick={spin}
            />
        </div>
    );
};
