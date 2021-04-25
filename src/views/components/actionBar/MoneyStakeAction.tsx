import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'clsx';
import RoundButton from '../../../components/Button/RoundButton';
import { FaMinus as DecreaseIcon, FaPlus as IncreaseIcon } from 'react-icons/fa';
import { Theme } from '../../../tools/Theme';

const useStyles = createUseStyles<Theme>((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        fontSize: '2rem',
    },
    button: {
       width: 30,
        height: 30
    },
    container: {
        textAlign: 'center',
        padding: theme.spacing,
        border: `2px solid ${theme.palette.common.border}`,
        borderRadius: 4,
        background: theme.palette.primary.dark,
        color: theme.palette.common.white,
        margin: `0px ${theme.spacing}px`,
        width: 150,
    },
}), {name: 'MoneyStakeAction'});

export interface MoneyStakeActionProps {
    className?: string;
    moneyStake: number;
    increase: () => void;
    decrease: () => void;

    increaseDisabled?: boolean;
    decreaseDisabled?: boolean;
}

export const MoneyStakeAction = (props: MoneyStakeActionProps) => {
    const {className, moneyStake, increase, decrease, decreaseDisabled, increaseDisabled} = props;
    const classes = useStyles(props);

    return (
        <div className={classNames(classes.root, className)}>
            <RoundButton className={classes.button} disabled={decreaseDisabled} onClick={decrease}>
                <DecreaseIcon className={classes.icon}/>
            </RoundButton>
            <div className={classes.container}>
                {moneyStake.toFixed(2)} €
            </div>
            <RoundButton className={classes.button} disabled={increaseDisabled} onClick={increase}>
                <IncreaseIcon className={classes.icon}/>
            </RoundButton>
        </div>
    );
};

