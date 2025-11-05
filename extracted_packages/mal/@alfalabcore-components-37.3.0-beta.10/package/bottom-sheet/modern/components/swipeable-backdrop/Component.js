import React from 'react';
import { Backdrop } from '../../../../backdrop/modern';

const SwipeableBackdrop = ({ opacity, handlers, opacityTimeout, style, ...backdropProps }) => (React.createElement("div", { ...handlers, style: {
        opacity,
        transition: opacity === 1 ? `opacity ${opacityTimeout}ms ease-in-out` : '',
        position: 'relative',
        ...style,
    } },
    React.createElement(Backdrop, { ...backdropProps })));

export { SwipeableBackdrop };
