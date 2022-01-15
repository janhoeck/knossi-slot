import classNames from 'clsx';
import React, { HTMLAttributes } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme } from '../../../tools/Theme';
import { useSlotContext } from '../../tools/SlotContext';
import { MoneyStakeAction } from './MoneyStakeAction';
import { SpinAction } from './SpinAction';
import { useAccountContext } from '../../../tools/context/AccountContext';
import { Balance } from './Balance';

const useStyles = createUseStyles<Theme>(
    (theme) => ({
        root: {
            width: '100%',
            background: theme.palette.primary.main,
            position: 'relative',
            padding: theme.spacing,
            display: 'flex',
            height: 60,
            justifyContent: 'space-between',
        },
        autoSpinAction: {},
        spinAction: {
            position: 'absolute',
            left: '50%',
            bottom: 25,
        },
    }),
    { name: 'SlotActionBar' }
);

export interface SlotActionBarProps extends HTMLAttributes<HTMLDivElement> {}

export const SlotActionBar = (props: SlotActionBarProps) => {
    const { className, ...restProps } = props;
    const classes = useStyles(props);
    const { spin, isSpinning, moneyStake, setMoneyStake } = useSlotContext();
    const { money } = useAccountContext();

    const increaseMoneyStake = () => {
        setMoneyStake((moneyStake) => {
            if (moneyStake < 1) {
                return moneyStake + 0.1;
            }
            return moneyStake + 1;
        });
    };

    const decreaseMoneyStake = () => {
        if (moneyStake <= 0.1) {
            return;
        }

        if (moneyStake > 1) {
            setMoneyStake((moneyStake) => moneyStake - 1);
        } else {
            setMoneyStake((moneyStake) => moneyStake - 0.1);
        }
    };

    return (
        <div className={classNames(classes.root, className)} {...restProps}>
            <MoneyStakeAction
                moneyStake={moneyStake}
                increase={increaseMoneyStake}
                decrease={decreaseMoneyStake}
                decreaseDisabled={moneyStake <= 0.1 || isSpinning}
                increaseDisabled={isSpinning}
            />
            <SpinAction className={classes.spinAction} disabled={isSpinning || money < moneyStake} onClick={spin} />
            <Balance balance={money} />
        </div>
    );
};

SlotActionBar.displayName = 'SlotActionBar';
