import React from 'react';
import cn from 'classnames';
import { useId } from '@alfalab/hooks';

const defaultColors = {"component":"spinner__component_15ktg"};
require('./default.css');

const styles = {"spinner":"spinner__spinner_3xla8","spin_animation":"spinner__spin_animation_3xla8","visible":"spinner__visible_3xla8","xs":"spinner__xs_3xla8","s":"spinner__s_3xla8","m":"spinner__m_3xla8"};
require('./index.css');

const invertedColors = {"component":"spinner__component_6zxa5"};
require('./inverted.css');

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};
const CONFIG = {
    xs: {
        padding: 1,
        lineWidth: 2,
        size: 18,
    },
    s: {
        padding: 2,
        lineWidth: 2,
        size: 24,
    },
    m: {
        padding: 4,
        lineWidth: 4,
        size: 48,
    },
};
const Spinner = ({ size: sizeProp = 's', colors = 'default', visible, id, className, dataTestId, }) => {
    const uniqId = useId();
    const { size, padding, lineWidth } = CONFIG[sizeProp];
    const xStart = padding + lineWidth / 2;
    const xEnd = size - xStart;
    const y = size / 2;
    const r = y - xStart;
    const topGradientId = `${uniqId}_top`;
    const bottomGradientId = `${uniqId}_bottom`;
    return (React.createElement("svg", { viewBox: `0 0 ${size} ${size}`, fill: 'none', xmlns: 'http://www.w3.org/2000/svg', className: cn(styles.spinner, colorStyles[colors].component, styles[sizeProp], className, {
            [styles.visible]: visible,
        }), "data-test-id": dataTestId, id: id },
        React.createElement("defs", null,
            React.createElement("linearGradient", { id: topGradientId, x1: '0.05' },
                React.createElement("stop", { offset: '0.1', stopOpacity: '0', stopColor: 'currentColor' }),
                React.createElement("stop", { offset: '1', stopOpacity: '0.3', stopColor: 'currentColor' })),
            React.createElement("linearGradient", { id: bottomGradientId, x1: '0.05' },
                React.createElement("stop", { offset: '0', stopOpacity: '1', stopColor: 'currentColor' }),
                React.createElement("stop", { offset: '1', stopOpacity: '0.3', stopColor: 'currentColor' }))),
        React.createElement("g", { strokeWidth: lineWidth },
            React.createElement("path", { stroke: `url(#${topGradientId})`, d: `M${xStart},${y} A${r},${r} 0 0 1 ${xEnd},${y}` }),
            React.createElement("path", { stroke: `url(#${bottomGradientId})`, d: `M${xEnd},${y} A${r},${r} 0 0 1 ${xStart},${y}` }),
            React.createElement("path", { stroke: 'currentColor', strokeLinecap: 'round', d: `M${xStart},${y} A${r},${r} 0 0 1 ${xStart} ${y}` }))));
};

export { Spinner };
