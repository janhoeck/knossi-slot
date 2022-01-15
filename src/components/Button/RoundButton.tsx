import React from 'react';
import { createUseStyles } from 'react-jss';
import Button, { ButtonProps } from './Button';
import classNames from 'clsx';

const useStyles = createUseStyles(
    {
        root: {
            borderRadius: '100%',
            width: 40,
            height: 40,
        },
    },
    { name: 'RoundButton' }
);

export interface RoundButtonProps extends ButtonProps {}

const RoundButton = (props: RoundButtonProps) => {
    const { className, classes: classesProp, children, ...restProps } = props;
    const classes = useStyles({ ...props, classes: classesProp });

    return (
        <Button className={classNames(className, classes.root)} {...restProps}>
            {children}
        </Button>
    );
};

export default RoundButton;
