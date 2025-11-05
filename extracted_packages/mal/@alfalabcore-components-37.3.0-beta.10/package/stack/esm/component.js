import React, { useContext } from 'react';
import { stackingOrder, StackingContext } from './context.js';

var Stack = function (_a) {
    var children = _a.children, _b = _a.value, value = _b === void 0 ? stackingOrder.DEFAULT : _b;
    var previousValue = useContext(StackingContext);
    var currentValue = Math.max(value, previousValue);
    var nextValue = currentValue + 1;
    return (React.createElement(StackingContext.Provider, { value: nextValue }, children(currentValue)));
};

export { Stack };
