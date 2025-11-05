import * as React from 'react';

const Item = (props) => {
    const { className, horizontalSize, verticalSize, length, direction, index, children, divider, wrap, } = props;
    let style = {};
    if (direction === 'vertical') {
        if (index < length - 1) {
            style = { marginBottom: horizontalSize / (divider ? 2 : 1) };
        }
    }
    else {
        style = {
            ...(index < length - 1 && { marginRight: horizontalSize / (divider ? 2 : 1) }),
            ...(wrap && { paddingBottom: verticalSize }),
        };
    }
    if (children === null || children === undefined) {
        return null;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: className, style: style }, children),
        index < length - 1 && divider && (React.createElement("span", { style: {
                width: '100%',
                ...style,
            } }, divider))));
};

export { Item as default };
