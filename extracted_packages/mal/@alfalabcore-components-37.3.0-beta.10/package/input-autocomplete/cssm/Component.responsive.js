var tslib_es6 = require('./tslib.es6-bbd6cd2a.js');
var React = require('react');
var hooks = require('@alfalab/hooks');
var Component_desktop = require('./Component.desktop.js');
var Component_mobile = require('./Component.mobile.js');
require('../../select/cssm');
require('./autocomplete-field/Component.js');
require('react-merge-refs');
require('classnames');
require('../../input/cssm');
require('./autocomplete-field/index.module.css');
require('lodash.throttle');
require('../../button/cssm');
require('./autocomplete-mobile-field/Component.js');
require('../../form-control/cssm');
require('./autocomplete-mobile-field/index.module.css');
require('./mobile.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var InputAutocompleteResponsive = function (_a) {
    var _b = _a.breakpoint, breakpoint = _b === void 0 ? 1024 : _b, restProps = tslib_es6.__rest(_a, ["breakpoint"]);
    var view = hooks.useMedia([
        ['mobile', "(max-width: ".concat(breakpoint - 1, "px)")],
        ['desktop', "(min-width: ".concat(breakpoint, "px)")],
    ], 'desktop')[0];
    return view === 'desktop' ? (React__default.default.createElement(Component_desktop.InputAutocompleteDesktop, tslib_es6.__assign({}, restProps))) : (React__default.default.createElement(Component_mobile.InputAutocompleteMobile, tslib_es6.__assign({}, restProps)));
};

exports.InputAutocompleteResponsive = InputAutocompleteResponsive;
