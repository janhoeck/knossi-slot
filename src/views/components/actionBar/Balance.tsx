import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'clsx';
import { Theme } from '../../../tools/Theme';

const useStyles = createUseStyles<Theme>(
    (theme) => ({
        root: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: theme.spacing,
            border: `2px solid ${theme.palette.common.border}`,
            borderRadius: 4,
            background: theme.palette.primary.dark,
            color: theme.palette.common.white,
            margin: `0px ${theme.spacing}px`,
            width: 150,
        },
    }),
    { name: 'MoneyStakeAction' }
);

export interface BalanceProps {
    className?: string;
    balance: number;
}

export const Balance = (props: BalanceProps) => {
    const { className, balance } = props;
    const classes = useStyles(props);

    return <div className={classNames(classes.root, className)}>{balance.toFixed(2)} €</div>;
};
