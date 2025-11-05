var tslib_es6 = require('../tslib.es6-bbd6cd2a.js');
var React = require('react');
var cn = require('classnames');
var coreComponentsButton = require('../../../button/cssm');
var utils_index = require('../utils/index.js');
var styles = require('./index.module.css');
require('@alfalab/icons-glyph/ChevronDownCompactSIcon');
require('@alfalab/icons-glyph/ChevronDownMIcon');
require('@alfalab/icons-glyph/MoreMIcon');
require('@alfalab/icons-glyph/MoreSIcon');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var Field = function (_a) {
    var _b;
    var _c = _a.buttonSize, buttonSize = _c === void 0 ? 'm' : _c, _d = _a.buttonVariant, buttonVariant = _d === void 0 ? 'default' : _d, view = _a.view, label = _a.label, open = _a.open; _a.multiple; var rightAddons = _a.rightAddons; _a.Arrow; var innerProps = _a.innerProps, className = _a.className; _a.selected; _a.selectedMultiple; _a.setSelectedItems; _a.toggleMenu; _a.valueRenderer; var _e = _a.showArrow, showArrow = _e === void 0 ? true : _e, restProps = tslib_es6.__rest(_a, ["buttonSize", "buttonVariant", "view", "label", "open", "multiple", "rightAddons", "Arrow", "innerProps", "className", "selected", "selectedMultiple", "setSelectedItems", "toggleMenu", "valueRenderer", "showArrow"]);
    var Icon = utils_index.getIcon(buttonVariant, buttonSize);
    var ref = innerProps.ref, restInnerProps = tslib_es6.__rest(innerProps, ["ref"]);
    var buttonProps = tslib_es6.__assign(tslib_es6.__assign({}, restProps), restInnerProps);
    return (React__default.default.createElement("div", { ref: ref },
        React__default.default.createElement(coreComponentsButton.Button, tslib_es6.__assign({}, buttonProps, { rightAddons: React__default.default.createElement(React.Fragment, null,
                rightAddons && (React__default.default.createElement("span", { className: cn__default.default(styles__default.default.addonsContainer, (_b = {},
                        _b[styles__default.default.showControlIcon] = showArrow || buttonVariant === 'compact',
                        _b)) }, rightAddons)),
                (showArrow || buttonVariant === 'compact') && (React__default.default.createElement("span", { className: cn__default.default(styles__default.default.iconContainer, buttonVariant !== 'compact' && open && styles__default.default.open) },
                    React__default.default.createElement(Icon, { "data-test-id": 'picker-button-icon' })))), block: true, view: view, size: buttonSize, className: cn__default.default(styles__default.default.component, view === 'primary' && styles__default.default.primary, className) }), buttonVariant !== 'compact' && label)));
};

exports.Field = Field;
