var Component = require('./Component-e056e813.js');
var React = require('react');
var cn = require('classnames');
var coreComponentsBottomSheet = require('../bottom-sheet');
var coreComponentsButton = require('../button');
var hooks = require('@alfalab/hooks');
var utils = require('./utils.js');
require('react-merge-refs');
require('../popover');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"target":"tooltip__target_1netx","overlap":"tooltip__overlap_1netx"};
require('./responsive.css');

var TooltipResponsive = function (_a) {
    var _b = _a.defaultMatch, defaultMatch = _b === void 0 ? 'mobile' : _b, content = _a.content, children = _a.children, open = _a.open, onOpen = _a.onOpen, onClose = _a.onClose, _c = _a.actionButtonTitle, actionButtonTitle = _c === void 0 ? 'Понятно' : _c, hasCloser = _a.hasCloser, targetRef = _a.targetRef, targetClassName = _a.targetClassName, bottomSheetProps = _a.bottomSheetProps, _d = _a.breakpoint, breakpoint = _d === void 0 ? 1024 : _d, restProps = Component.__rest(_a, ["defaultMatch", "content", "children", "open", "onOpen", "onClose", "actionButtonTitle", "hasCloser", "targetRef", "targetClassName", "bottomSheetProps", "breakpoint"]);
    var view = hooks.useMedia([
        ['mobile', "(max-width: ".concat(breakpoint - 1, "px)")],
        ['desktop', "(min-width: ".concat(breakpoint, "px)")],
    ], defaultMatch)[0];
    var _e = utils.useControlled(open, false), openValue = _e[0], setOpenValueIfUncontrolled = _e[1];
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
    return isMobile ? (React__default.default.createElement(React.Fragment, null,
        React__default.default.createElement(coreComponentsBottomSheet.BottomSheet, Component.__assign({}, restProps, { open: Boolean(openValue), onClose: handleClose, hasCloser: hasCloser, actionButton: React__default.default.createElement(coreComponentsButton.Button, { view: 'secondary', block: true, size: 's', onClick: handleClose }, actionButtonTitle) }, bottomSheetProps), content),
        React__default.default.createElement("div", { ref: targetRef, onClick: handleOpen, className: cn__default.default(styles.target, targetClassName) },
            (children === null || children === void 0 ? void 0 : children.props.disabled) && React__default.default.createElement("div", { className: styles.overlap }),
            children))) : (React__default.default.createElement(Component.TooltipDesktop, Component.__assign({}, restProps, { open: open, content: content, onOpen: handleOpen, onClose: handleClose, targetClassName: targetClassName, targetRef: targetRef }), children));
};

exports.TooltipResponsive = TooltipResponsive;
