import classNames from 'clsx';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { Theme } from '../../../tools/Theme';
import { SlotSymbol } from '../../tools/SlotSymbols';

const useStyles = createUseStyles<Theme>((theme) => ({
    root: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `4px solid ${theme.palette.common.white}`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    text: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '3rem',
        color: theme.palette.common.white
    }
}), { name: 'SlotItem' });

export interface SlotItemProps {
    className?: string;
    symbol: SlotSymbol
}

export const SlotItem = (props: SlotItemProps) => {
    const { className, symbol } = props;
    const classes = useStyles(props);

    return (
        <div
            className={classNames(className, classes.root)}
            style={{
                backgroundImage: `url("${symbol.image}")`
            }}
        />
    );
};
