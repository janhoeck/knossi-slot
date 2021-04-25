import React from 'react';
import {SlotContextProvider} from './tools/SlotContext';
import {SlotViewContent, SlotViewContentProps} from './SlotViewContent';

export interface SlotViewProps extends SlotViewContentProps {}

export const SlotView = (props: SlotViewProps) => (
    <SlotContextProvider>
        <SlotViewContent {...props} />
    </SlotContextProvider>
);
