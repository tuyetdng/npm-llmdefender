import React from 'react';
import cn from 'classnames';

var ButtonList = function (_a) {
    var buttons = _a.buttons, buttonClassName = _a.buttonClassName, containerClassName = _a.containerClassName;
    var buttonsIsArray = Array.isArray(buttons) && buttons.length > 0;
    if (buttonsIsArray) {
        return (React.createElement("div", { className: containerClassName }, buttons.map(function (button, index) {
            return button
                ? React.cloneElement(button, {
                    // eslint-disable-next-line react/no-array-index-key
                    key: index,
                    size: 'xxs',
                    view: index === 0 ? 'secondary' : 'link',
                    className: cn(button.props.className, buttonClassName),
                })
                : null;
        })));
    }
    return React.createElement("div", { className: containerClassName }, buttons);
};

export { ButtonList };
