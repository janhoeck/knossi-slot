import classNames from 'clsx';
import React from 'react';
import { createUseStyles } from 'react-jss';
import RoundButton, { RoundButtonProps } from '../../../components/Button/RoundButton';
import { Theme } from '../../../tools/Theme';
import { FaPlay as PlayIcon } from 'react-icons/fa';

const useStyles = createUseStyles<Theme>((theme) => ({
    root: {
        height: 80,
        width: 80,
        border: '4px solid gold',
    },
    icon: {
        fontSize: '1rem'
    }
}), { name: 'SpinAction' });

export interface SpinActionProps extends RoundButtonProps {}

export const SpinAction = (props: SpinActionProps) => {
    const { className, ...restProps } = props;
    const classes = useStyles(props);

    return (
        <RoundButton className={classNames(classes.root, className)} {...restProps}>
            <PlayIcon className={classes.icon} />
        </RoundButton>
    );
};
