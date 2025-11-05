import { a as __rest, _ as __assign } from '../../tslib.es6-1d201b00.js';
import React, { useContext, useCallback } from 'react';
import cn from 'classnames';
import { BaseModalContext } from '../../../../base-modal/esm';
import { IconButton } from '../../../../icon-button/esm';
import { CrossMIcon } from '@alfalab/icons-glyph/CrossMIcon';

var styles = {"closer":"bottom-sheet__closer_1iz26","button":"bottom-sheet__button_1iz26"};
require('./index.css');

var Closer = function (_a) {
    var className = _a.className, _b = _a.size, size = _b === void 0 ? 'xs' : _b, _c = _a.icon, icon = _c === void 0 ? CrossMIcon : _c, dataTestId = _a.dataTestId, restProps = __rest(_a, ["className", "size", "icon", "dataTestId"]);
    var onClose = useContext(BaseModalContext).onClose;
    var handleClick = useCallback(function (event) {
        onClose(event, 'closerClick');
    }, [onClose]);
    return (React.createElement("div", { className: cn(styles.closer, className) },
        React.createElement(IconButton, __assign({ size: size, className: styles.button, "aria-label": '\u0437\u0430\u043A\u0440\u044B\u0442\u044C', onClick: handleClick, icon: icon, dataTestId: dataTestId }, restProps))));
};

export { Closer };
