var components_baseConfirmation_component = require('./component-d80d765d.js');
var React = require('react');
var hooks = require('@alfalab/hooks');
var component_desktop = require('./component.desktop.js');
var component_mobile = require('./component.mobile.js');
require('classnames');
require('./context.js');
require('./utils.js');
require('./types.js');
require('./components/screens/initial/component.js');
require('../button');
require('../code-input');
require('../link');
require('../typography');
require('./components/header/component.js');
require('./countdown-section-d076e0d4.js');
require('../loader');
require('./components/screens/hint/component.js');
require('./components/screens/fatal-error/component.js');
require('./components/screens/temp-block/component.js');
require('./components/countdown-loader/component.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var ConfirmationResponsive = function (_a) {
    var _b = _a.breakpoint, breakpoint = _b === void 0 ? 1024 : _b, restProps = components_baseConfirmation_component.__rest(_a, ["breakpoint"]);
    var view = hooks.useMedia([
        ['mobile', "(max-width: ".concat(breakpoint - 1, "px)")],
        ['desktop', "(min-width: ".concat(breakpoint, "px)")],
    ], 'desktop')[0];
    return view === 'desktop' ? (React__default.default.createElement(component_desktop.ConfirmationDesktop, components_baseConfirmation_component.__assign({}, restProps))) : (React__default.default.createElement(component_mobile.ConfirmationMobile, components_baseConfirmation_component.__assign({}, restProps)));
};

exports.ConfirmationResponsive = ConfirmationResponsive;
