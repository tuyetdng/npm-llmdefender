import { _ as __rest, a as __assign } from '../tslib.es6-ebff0dba.js';
import React, { Fragment } from 'react';
import cn from 'classnames';
import { Button } from '../../../button/esm';
import { getIcon } from '../utils/index.js';
import '@alfalab/icons-glyph/ChevronDownCompactSIcon';
import '@alfalab/icons-glyph/ChevronDownMIcon';
import '@alfalab/icons-glyph/MoreMIcon';
import '@alfalab/icons-glyph/MoreSIcon';

var styles = {"iconContainer":"picker-button__iconContainer_1043d","addonsContainer":"picker-button__addonsContainer_1043d","showControlIcon":"picker-button__showControlIcon_1043d","open":"picker-button__open_1043d"};
require('./index.css');

var Field = function (_a) {
    var _b;
    var _c = _a.buttonSize, buttonSize = _c === void 0 ? 'm' : _c, _d = _a.buttonVariant, buttonVariant = _d === void 0 ? 'default' : _d, view = _a.view, label = _a.label, open = _a.open; _a.multiple; var rightAddons = _a.rightAddons; _a.Arrow; var innerProps = _a.innerProps, className = _a.className; _a.selected; _a.selectedMultiple; _a.setSelectedItems; _a.toggleMenu; _a.valueRenderer; var _e = _a.showArrow, showArrow = _e === void 0 ? true : _e, restProps = __rest(_a, ["buttonSize", "buttonVariant", "view", "label", "open", "multiple", "rightAddons", "Arrow", "innerProps", "className", "selected", "selectedMultiple", "setSelectedItems", "toggleMenu", "valueRenderer", "showArrow"]);
    var Icon = getIcon(buttonVariant, buttonSize);
    var ref = innerProps.ref, restInnerProps = __rest(innerProps, ["ref"]);
    var buttonProps = __assign(__assign({}, restProps), restInnerProps);
    return (React.createElement("div", { ref: ref },
        React.createElement(Button, __assign({}, buttonProps, { rightAddons: React.createElement(Fragment, null,
                rightAddons && (React.createElement("span", { className: cn(styles.addonsContainer, (_b = {},
                        _b[styles.showControlIcon] = showArrow || buttonVariant === 'compact',
                        _b)) }, rightAddons)),
                (showArrow || buttonVariant === 'compact') && (React.createElement("span", { className: cn(styles.iconContainer, buttonVariant !== 'compact' && open && styles.open) },
                    React.createElement(Icon, { "data-test-id": 'picker-button-icon' })))), block: true, view: view, size: buttonSize, className: cn(styles.component, view === 'primary' && styles.primary, className) }), buttonVariant !== 'compact' && label)));
};

export { Field };
