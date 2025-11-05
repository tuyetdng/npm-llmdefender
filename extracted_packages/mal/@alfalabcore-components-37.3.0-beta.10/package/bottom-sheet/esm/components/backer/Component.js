import { a as __rest, _ as __assign } from '../../tslib.es6-1d201b00.js';
import React from 'react';
import cn from 'classnames';
import { IconButton } from '../../../../icon-button/esm';
import { ArrowBackMIcon } from '@alfalab/icons-glyph/ArrowBackMIcon';

var styles = {"backer":"bottom-sheet__backer_1k990","button":"bottom-sheet__button_1k990"};
require('./index.css');

var Backer = function (_a) {
    var className = _a.className, _b = _a.size, size = _b === void 0 ? 'xs' : _b, _c = _a.icon, icon = _c === void 0 ? ArrowBackMIcon : _c, dataTestId = _a.dataTestId, onClick = _a.onClick, restProps = __rest(_a, ["className", "size", "icon", "dataTestId", "onClick"]);
    return (React.createElement("div", { className: cn(styles.backer, className) },
        React.createElement(IconButton, __assign({ size: size, className: styles.button, "aria-label": '\u043D\u0430\u0437\u0430\u0434', onClick: onClick, icon: icon, dataTestId: dataTestId }, restProps))));
};

export { Backer };
