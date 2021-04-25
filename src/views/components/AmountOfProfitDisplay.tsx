import classNames from 'clsx';
import React from 'react';
import {createUseStyles} from 'react-jss';
import {Theme} from '../../tools/Theme';

const useStyles = createUseStyles<Theme>((theme) => ({
    root: {
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        height: '100%'
    },
    amount: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '5em',
        fontWeight: 'bold',
        animation: '$fade-out 4s forwards',
        color: theme.palette.common.white,
        transition: 'opacity 0.4s linear',
    },
    '@keyframes fade-out': {
        '0%': {
            opacity: 1
        },
        '10%': {
            opacity: 0.9
        },
        '20%': {
            opacity: 0.8
        },
        '30%': {
            opacity: 0.7
        },
        '40%': {
            opacity: 0.6
        },
        '50%': {
            opacity: 0.5
        },
        '60%': {
            opacity: 0.4
        },
        '70%': {
            opacity: 0.3
        },
        '80%': {
            opacity: 0.2
        },
        '90%': {
            opacity: 0.1
        },
        '100%': {
            opacity: 0,
            animationPlayState: 'paused'
        }
    }
}), {name: 'AmountOfProfitDisplay'});

export interface AmountOfProfitDisplayProps {
    className?: string;
    amount: number;
}

export const AmountOfProfitDisplay = (props: AmountOfProfitDisplayProps) => {
    const {className, amount} = props;
    const classes = useStyles(props);

    return (
        <div className={classNames(classes.root, className)}>
            <span className={classes.amount}>
                + {amount.toFixed(2)} €
            </span>
        </div>
    );
};

AmountOfProfitDisplay.displayName = 'AmountOfProfitDisplay';
