import classNames from 'clsx';
import React, {
    forwardRef,
    HTMLAttributes,
    Ref,
    useCallback,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { createUseStyles } from 'react-jss';
import { Theme } from '../../../tools/Theme';
import { SpinResult, useSlotContext } from '../../tools/SlotContext';
import { SlotSymbol } from '../../tools/SlotSymbols';
import { SlotColumn, SlotColumnRef } from './SlotColumn';

const useStyles = createUseStyles<Theme>((theme) => ({
    root: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        position: 'relative',
        overflow: 'hidden',
        outline: `2px solid ${theme.palette.common.white}`
    },
    slotColumn: {
        position: 'absolute',
    },
}), {name: 'Slot'});

export interface SlotProps extends HTMLAttributes<HTMLDivElement> {
}

export interface SlotRef {
    spin: () => Promise<SpinResult[][]>;
}

export const Slot = forwardRef((props: SlotProps, ref: Ref<SlotRef>) => {
    const {className, ...restProps} = props;
    const classes = useStyles(props);
    const {symbolsMap, rows, columns} = useSlotContext();

    const [columnWidth, setColumnWidth] = useState<number>(0);
    const rootRef = useRef<HTMLDivElement>(null);
    const columnRefs = useRef<SlotColumnRef[]>([]);

    /**
     * Register a slot column reference for a specific index
     * @param index
     */
    const handleSlotColumnRef = (index: number) => {
        return (ref: SlotColumnRef) => {
            columnRefs.current[index] = ref;
        };
    };

    const spin = useCallback((): Promise<SpinResult[][]> => {
        return new Promise<SpinResult[][]>(async (resolve) => {
            if (columnWidth !== 0 && columnRefs.current.length !== 0) {
                const visibleSymbols = await Promise.all(columnRefs.current.map((columnRef, index) => {
                    return columnRef.spin(500 + (index * 500));
                }));
                resolve(visibleSymbols);
            }
        });
    }, [columnWidth, columnRefs]);

    useLayoutEffect(() => {
        const {current} = rootRef;
        if (current) {
            setColumnWidth(current.getBoundingClientRect().width / columns);
        }
    }, [rootRef, columns]);

    useImperativeHandle(ref, () => ({
        spin: spin,
    }));

    return (
        <div
            className={classNames(classes.root, className)}
            ref={rootRef}
            style={{
                height: columnWidth * rows,
            }}
            {...restProps}
        >
            {symbolsMap.map((slotSymbols: SlotSymbol[], index: number) => (
                <SlotColumn
                    key={index}
                    ref={handleSlotColumnRef(index)}
                    className={classes.slotColumn}
                    index={index}
                    width={columnWidth}
                    slotSymbols={slotSymbols}
                />
            ))}
        </div>
    );
});
