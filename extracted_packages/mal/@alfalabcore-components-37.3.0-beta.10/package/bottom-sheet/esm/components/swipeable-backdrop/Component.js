import { a as __rest, _ as __assign } from '../../tslib.es6-1d201b00.js';
import React from 'react';
import { Backdrop } from '../../../../backdrop/esm';

var SwipeableBackdrop = function (_a) {
    var opacity = _a.opacity, handlers = _a.handlers, opacityTimeout = _a.opacityTimeout, style = _a.style, backdropProps = __rest(_a, ["opacity", "handlers", "opacityTimeout", "style"]);
    return (React.createElement("div", __assign({}, handlers, { style: __assign({ opacity: opacity, transition: opacity === 1 ? "opacity ".concat(opacityTimeout, "ms ease-in-out") : '', position: 'relative' }, style) }),
        React.createElement(Backdrop, __assign({}, backdropProps))));
};

export { SwipeableBackdrop };
