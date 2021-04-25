import React from 'react';
import { createUseStyles, WithStylesProps } from 'react-jss';
import classNames from 'clsx';
import { Theme } from '../../tools/Theme';

const useStyles = createUseStyles<Theme>((theme) => ({
    root: {
        padding: theme.spacing,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.primary.dark,
        border: `2px solid ${theme.palette.common.border}`,
        cursor: 'pointer',
        color: theme.palette.common.white,
        '&:focus': {
            outline: 'none'
        }
    },
    disabled: {
        backgroundColor: '#6e7b9e'
    }
}), { name: 'Button' });

export interface ButtonProps extends React.ComponentProps<'button'>, Partial<WithStylesProps<typeof useStyles>> {
    className?: string;
}

const Button = (props: ButtonProps) => {
    const { className, classes: classesProp, children, disabled, ...restProps } = props;
    const classes = useStyles({ ...props, classes: classesProp });

    return (
        <button
            className={classNames(className, classes.root, {[classes.disabled]: disabled})}
            disabled={disabled}
            {...restProps}
        >
            {children}
        </button>
    )
};

export default Button;
