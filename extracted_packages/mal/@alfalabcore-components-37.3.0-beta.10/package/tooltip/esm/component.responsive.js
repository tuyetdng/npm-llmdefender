import { _ as __rest, a as __assign, T as TooltipDesktop } from './Component-088c25a0.js';
import React, { Fragment } from 'react';
import cn from 'classnames';
import { BottomSheet } from '../../bottom-sheet/esm';
import { Button } from '../../button/esm';
import { useMedia } from '@alfalab/hooks';
import { useControlled } from './utils.js';
import 'react-merge-refs';
import '../../popover/esm';

var styles = {"target":"tooltip__target_1netx","overlap":"tooltip__overlap_1netx"};
require('./responsive.css');

var TooltipResponsive = function (_a) {
    var _b = _a.defaultMatch, defaultMatch = _b === void 0 ? 'mobile' : _b, content = _a.content, children = _a.children, open = _a.open, onOpen = _a.onOpen, onClose = _a.onClose, _c = _a.actionButtonTitle, actionButtonTitle = _c === void 0 ? 'Понятно' : _c, hasCloser = _a.hasCloser, targetRef = _a.targetRef, targetClassName = _a.targetClassName, bottomSheetProps = _a.bottomSheetProps, _d = _a.breakpoint, breakpoint = _d === void 0 ? 1024 : _d, restProps = __rest(_a, ["defaultMatch", "content", "children", "open", "onOpen", "onClose", "actionButtonTitle", "hasCloser", "targetRef", "targetClassName", "bottomSheetProps", "breakpoint"]);
    var view = useMedia([
        ['mobile', "(max-width: ".concat(breakpoint - 1, "px)")],
        ['desktop', "(min-width: ".concat(breakpoint, "px)")],
    ], defaultMatch)[0];
    var _e = useControlled(open, false), openValue = _e[0], setOpenValueIfUncontrolled = _e[1];
    var handleOpen = function (event) {
        if (onOpen) {
            onOpen(event);
        }
        else {
            setOpenValueIfUncontrolled(true);
        }
    };
    var handleClose = function (event) {
        if (onClose) {
            onClose(event);
        }
        else {
            setOpenValueIfUncontrolled(false);
        }
    };
    var isMobile = view === 'mobile';
    return isMobile ? (React.createElement(Fragment, null,
        React.createElement(BottomSheet, __assign({}, restProps, { open: Boolean(openValue), onClose: handleClose, hasCloser: hasCloser, actionButton: React.createElement(Button, { view: 'secondary', block: true, size: 's', onClick: handleClose }, actionButtonTitle) }, bottomSheetProps), content),
        React.createElement("div", { ref: targetRef, onClick: handleOpen, className: cn(styles.target, targetClassName) },
            (children === null || children === void 0 ? void 0 : children.props.disabled) && React.createElement("div", { className: styles.overlap }),
            children))) : (React.createElement(TooltipDesktop, __assign({}, restProps, { open: open, content: content, onOpen: handleOpen, onClose: handleClose, targetClassName: targetClassName, targetRef: targetRef }), children));
};

export { TooltipResponsive };
