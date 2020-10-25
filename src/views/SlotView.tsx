import classNames from 'clsx';
import React, { HTMLAttributes } from 'react';
import { createUseStyles, WithStylesProps } from 'react-jss';
import { SlotActionBar } from './components/actionBar/SlotActionBar';
import { Slot } from './components/slot/Slot';
import { useSlotContext } from './tools/SlotContext';

const backgroundImage = require('./assets/angelcamp.jpg');

const useStyles = createUseStyles({
    root: {
        height: '100vh',
        width: '100vw',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url("${backgroundImage}")`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    },
    slotContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    slot: {
        width: '90%',
        maxWidth: 1000,
    },
    actionBar: {}
}, { name: 'SlotView' });

export interface SlotViewProps extends HTMLAttributes<HTMLDivElement>, Partial<WithStylesProps<typeof useStyles>> {}

export const SlotView = (props: SlotViewProps) => {
    const { className, ...restProps } = props;
    const classes = useStyles();
    const { registerSlot } = useSlotContext();

    return (
        <div className={classNames(classes.root, className)} {...restProps} >
            <div className={classes.slotContainer}>
                <Slot className={classes.slot} ref={registerSlot}/>
            </div>
            <SlotActionBar className={classes.actionBar}/>
        </div>
    );
};
